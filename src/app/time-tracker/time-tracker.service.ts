import { ITimeTracker } from './model/time-tracker';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IStudent } from './model/student';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TimeTrackerService {

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

  saveStudentTime(student: IStudent) {
    const date = new Date();

    const trackStudentTime: ITimeTracker = {
      studentId: student.studentId,
      createDate: date.toISOString().split('T')[0],
      inTime: date,
      outTime: null,
      total: null
    };
    const timeCollection = this.afs.collection<ITimeTracker>('timeTracker');
    timeCollection.add(trackStudentTime);

    const studentCollection = this.afs.doc(`students/${student.studentId}`);
    student.status = 'in';
    studentCollection.set(student, { merge: true });
  }

  updateStudentTime(student: IStudent) {
    const date = new Date();
    const createDate = date.toISOString().split('T')[0];

    const timeCollection = this.afs.collection<ITimeTracker>('timeTracker', ref => ref.where('studentId', '==', student.studentId)
      .where('createDate', '==', createDate).where('outTime', '==', null));

    timeCollection.valueChanges().subscribe(val => {
      if (val) {
        const inTime = val[0].inTime;
        const compareTimes = date.getTime() - inTime.getTime();
        const totalTime = compareTimes / 1000 * 60 * 60;
        console.log(totalTime);



        // outTime: date.toISOString().split('T')[0],
        //   total: null
      }
    });








  }


}
