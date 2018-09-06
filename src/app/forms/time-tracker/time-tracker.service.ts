
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// Import RxJs required methods
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { take } from 'rxjs/operators';
import { IStudent } from '../../model/student';
import { ITimeTracker } from '../../model/time-tracker';
import { environment } from '@environment/environment';


@Injectable()
export class TimeTrackerService {

  student: IStudent[];
  trackerRecord: ITimeTracker;

  private studentUrl = environment.studentApiUrl;
  private timeTrackerUrl = environment.timeTrackerApiUrl;

  constructor(private afs: AngularFirestore, private http: Http) { }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  // get student by id
  getStudent(studentId: string): Observable<IStudent[]> {
    const collection = this.afs.collection<IStudent>('students', ref => ref.where('studentId', '==', studentId));
    const student = collection.valueChanges();
    return student;
  }
  // get student by date
  getStudentByDate(studentId: string, createDate: string): Observable<IStudent[]> {
    const collection = this.afs.collection<IStudent>('students', ref => ref.where('studentId', '==', studentId)
      .where('createDate', '==', createDate));
    const trackerRecord = collection.valueChanges();
    return trackerRecord;
  }

  // get list of all students
  public getStudents(): Observable<IStudent[]> {
    // const studentCollection = this.afs.collection<IStudent>('students', ref => ref.orderBy('firstName'));
    // const students = studentCollection.valueChanges();

    // ...using get request
    const students = this.http.get(this.studentUrl)
      // ...and calling .json() on the response to return data
      .map((res: Response) =>
        res.json()
      )
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    console.log(students);
    return students;
    // ...errors if any
  }


  // get list of all students
  // getAllStudents(): Observable<IStudent[]> {
  //   /*const studentCollection = this.afs.collection<IStudent>('students');
  //   const students = studentCollection.valueChanges();
  //   return students;*/

  //   // ...using get request
  //   const students = this.http.get(this.studentUrl)
  //     // ...and calling .json() on the response to return data
  //     .map((res: Response) =>
  //       res.json()
  //     )
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error ' + error));

  //   console.log(students);
  //   return students;
  //   // ...errors if any
  // }

  // log out all students still signed it. This will set's the student hours to 1
  logOutStudents(today: Date) {
    const loginDate = this.formatDate(today);
    console.log(loginDate);
    const studentCollection = this.afs.collection<IStudent>('students', ref => ref.where('status', '==', 'in'));
    const tempStudentSub = studentCollection.valueChanges().subscribe(s => {
      tempStudentSub.unsubscribe();
      s.forEach(student => {
        const id = student.studentId;
        const timeCollection = this.afs.collection<ITimeTracker>('timeTracker', ref => ref.where('studentId', '==', id)
          .where('createDate', '==', loginDate).where('outTime', '==', null));

        const tempTimeSub = this.getCollectionWithID<ITimeTracker>(timeCollection).subscribe(recs => {
          tempTimeSub.unsubscribe();
          recs.forEach(timeRecord => {
            this.afs.doc(`timeTracker/${(timeRecord as any).id}`).set({
              outTime: today,
              totalHrs: 1,
              points: 0,
              adminSignedOut: true
            }, { merge: true });
            this.afs.doc(`students/${id}`).set({
              status: 'out',
              checkInTime: null
            }, { merge: true });

            // TODO: send email

          });
        });
      });
    });
  }

  totalStudentsLogin() {
    const studentCollection = this.afs.collection<IStudent>('students', ref => ref.where('status', '==', 'in'));
    return studentCollection.valueChanges();
  }

  editStudentRecord(today, studentId, in_time, out_time, hours, points) {
    const loginDate = today.toISOString().split('T')[0];

    const timeCollection = this.afs.collection<ITimeTracker>('timeTracker', ref => ref.where('studentId', '==', studentId)
      .where('createDate', '==', loginDate));

    this.getCollectionWithID<ITimeTracker>(timeCollection).pipe(take(1)).subscribe(recs => {

      recs.forEach(timeRecord => {
        this.afs.doc(`timeTracker/${(timeRecord as any).id}`).set({
          inTime: in_time,
          outTime: out_time,
          totalHrs: hours,
          points: points,
          adminSignedOut: true
        }, { merge: true });
      });
    });
  }


  // CRUD

  saveStudentTime(trackerRecord: IStudent): Observable<ITimeTracker> {

      const date = new Date();

      const trackStudentTime: ITimeTracker = {
        studentId: trackerRecord.studentId,
        createDate: this.formatDate(date),
        createDateTime: date,
        inTime: date,
        outTime: null,
        totalHrs: null
      };

    console.log('trackerRecord ', trackStudentTime);
    const bodyString = JSON.stringify(trackerRecord); // Stringify payload
    const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.timeTrackerUrl, bodyString, options) // ...using post request
      .map((res: Response) => res.json())
      .catch(this.handleError); // ...errors if any

    //   const timeCollection = this.afs.collection<ITimeTracker>('timeTracker');
    //   timeCollection.add(trackStudentTime);

    //   const studentCollection = this.afs.doc(`students/${student.studentId}`);
    //   student.status = 'in';
    //   student.checkInTime = date;
    //   studentCollection.set(student, { merge: true });
  }



  updateStudentTime(student: IStudent) {
    // const date = new Date(2018, 0, 10, 21, 0, 0);
    const date = new Date();
    const createDate = this.formatDate(date);
    console.log(createDate);
    const timeCollection = this.afs.collection<ITimeTracker>('timeTracker', ref => ref.where('studentId', '==', student.studentId)
      .where('createDate', '==', createDate).where('outTime', '==', null));

    const toUpdate = timeCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as ITimeTracker;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });

    const tempUpdateSub = toUpdate.subscribe(val => {

      const inTime = val[0].inTime;
      const compareTimes = date.getTime() - inTime.getTime();
      const totalTime = Math.round((compareTimes / (1000 * 60 * 60) * 100)) / 100;
      const totalPoints = Math.floor(((totalTime * 60) / 60) / 2.5);

      tempUpdateSub.unsubscribe();

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

  formatDate(d: Date): string {
    const mm = d.getMonth() + 1; // getMonth() is zero-based
    const dd = d.getDate();

    return [d.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
  }

  getCollectionWithID<T extends object>(collection: AngularFirestoreCollection<T>): Observable<T[]> {
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
