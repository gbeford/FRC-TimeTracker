import { ITimeTracker } from './model/time-tracker';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IStudent } from './model/student';
import { AngularFirestore } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';

@Injectable()
export class TimeTrackerService {

  student: IStudent[];
  constructor(private afs: AngularFirestore) { }

  // get student by id
  getStudent(studentId: string): Observable<IStudent[]> {
    const collection = this.afs.collection<IStudent>('students', ref => ref.where('studentId', '==', studentId));
    const student = collection.valueChanges();
    return student;
  }

  // get list of all students
  getStudents(): Observable<IStudent[]> {
    const studentCollection = this.afs.collection<IStudent>('students', ref => ref.orderBy('firstName'));
    const students = studentCollection.valueChanges();
    return students;
  }


  logOutStudents(today: Date) {
    const loginDate = today.toISOString().split('T')[0];

    const studentCollection = this.afs.collection<IStudent>('students', ref => ref.where('status', '==', 'in'));
    studentCollection.valueChanges().subscribe(s => {
      s.forEach(student => {
        const id = student.studentId;

        const timeCollection = this.afs.collection<ITimeTracker>('timeTracker', ref => ref.where('studentId', '==', id)
          .where('createDate', '==', loginDate).where('outTime', '==', null));

        const toUpdateTracker = this.getCollectionWithID<ITimeTracker>(timeCollection);
        toUpdateTracker.forEach(timeRecord => {
          this.afs.doc(`timeTracker/${(timeRecord as any).id}`).set({
            outTime: today,
            totalHrs: 1,
            points: 0
          }, { merge: true });
          this.afs.doc(`students/${id}`).set({
            status: 'out',
            checkInTime: null
          }, { merge: true });

          // send email
        });
      });
    });
  }

  totalStudentsLogin(): Observable<IStudent[]> {
    const collection = this.afs.collection<IStudent>('students', ref => ref.where('status', '==', 'in'));
    const students = collection.valueChanges();
    return students;
  }



  // CRUD

  saveStudentTime(student: IStudent) {
    const date = new Date();

    const trackStudentTime: ITimeTracker = {
      studentId: student.studentId,
      createDate: date.toISOString().split('T')[0],
      createDateTime: date,
      inTime: date,
      outTime: null,
      totalHrs: null
    };

    const timeCollection = this.afs.collection<ITimeTracker>('timeTracker');
    timeCollection.add(trackStudentTime);

    const studentCollection = this.afs.doc(`students/${student.studentId}`);
    student.status = 'in';
    student.checkInTime = date;
    studentCollection.set(student, { merge: true });
  }

  updateStudentTime(student: IStudent) {
    const date = new Date();
    const createDate = date.toISOString().split('T')[0];

    const timeCollection = this.afs.collection<ITimeTracker>('timeTracker', ref => ref.where('studentId', '==', student.studentId)
      .where('createDate', '==', createDate).where('outTime', '==', null));

    const toUpdate = timeCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        // console.log(action);
        const data = action.payload.doc.data() as ITimeTracker;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });

    toUpdate.pipe(take(1)).subscribe(val => {

      const inTime = val[0].inTime;
      const compareTimes = date.getTime() - inTime.getTime();
      const totalTime = Math.round((compareTimes / (1000 * 60 * 60) * 100)) / 100;
      const totalPoints = Math.floor(totalTime / 3);

      this.afs.doc(`timeTracker/${val[0].id}`).set({
        outTime: date,
        totalHrs: totalTime,
        points: totalPoints
      }, { merge: true });

      this.afs.doc(`students/${student.studentId}`).set({
        status: 'out',
        checkInTime: null
      }, { merge: true });
    });
  }


  // report data

  getStudentTimeTrackerInfo(studentId: string, startDate: Date, endDate: Date): Observable<ITimeTracker[]> {
    endDate = new Date(endDate.setHours(23, 59, 59, 0));
    const reportCollection = this.afs.collection<ITimeTracker>('timeTracker', ref => ref.where('studentId', '==', studentId)
      .where('createDateTime', '>=', startDate).where('createDateTime', '<=', endDate).orderBy('createDateTime', 'asc'));
    const trackerInfo = reportCollection.valueChanges();

    return trackerInfo;
  }


// generic functions

getCollectionWithID < T extends object > (collection): [T] {
  return collection.snapshotChanges().map(actions => {
    return actions.map(action => {
      // console.log(action);
      const data = action.payload.doc.data();
      data.id = action.payload.doc.id;
      return data as T;
    });
  });
}




}
