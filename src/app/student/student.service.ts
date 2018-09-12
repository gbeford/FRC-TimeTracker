
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Student } from '../model/student';
import { ITimeTracker } from '../model/time-tracker';
import { environment } from '@environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Utilities } from '../shared/utils';


@Injectable()
export class StudentService {

  student: Student[];
  trackerRecord: ITimeTracker;


  constructor(private http: HttpClient) { }


  // get student by id
  getStudent(id: string): Observable<Student[]> {
    return this.http.get<Student[]>('${environment.studentApiUrl}/${id}')
      .pipe(
        catchError(Utilities.handleError)
      );   // ...errors if any

  }

  // get student by date
  // getStudentByDate(studentId: string, createDate: string): Observable<IStudent[]> {
  // const collection = this.afs.collection<IStudent>('students', ref => ref.where('studentId', '==', studentId)
  //   .where('createDate', '==', createDate));
  // const trackerRecord = collection.valueChanges();
  // return trackerRecord;
  // }

  // get list of all students
  public getStudents(): Observable<Student[]> {
    // get request
    return this.http.get<Student[]>(environment.studentApiUrl)
      .pipe(
        catchError(Utilities.handleError)
      );   // ...errors if any
  }




  // log out all students still signed it. This will set's the student hours to 1
  logOutStudents() {
    return this.http.post(environment.signOutAllStudentsUrl, {})
      .pipe(
        catchError(Utilities.handleError)
      );
  }

  totalStudentsLogin() {
    // const studentCollection = this.afs.collection<IStudent>('students', ref => ref.where('status', '==', 'in'));
    // return studentCollection.valueChanges();
  }



  signIn_OutStudent(signIn: Student): Observable<Student> {
    if (!signIn.isSignedIn) {
      return this.http.post<Student>(environment.signInStudentUrl, signIn.studentId)
        .pipe(
          catchError(Utilities.handleError)
        );
    } else {
      return this.http.post<Student>(environment.signOutStudentUrl, signIn.studentId)
        .pipe(
          catchError(Utilities.handleError)
        );
    }

  }




  // CRUD


  editStudentRecord(updateStudent: Student): Observable<void | {}> {
    // const loginDate = today.toISOString().split('T')[0];

    return this.http.put<void>(`environment.updateStudentUrl/${updateStudent.studentId}`, updateStudent)
      .pipe(
        catchError(Utilities.handleError)
      );

  }


  // report data

  // getStudentTimeTrackerInfo(studentId: string, startDate: Date, endDate: Date): Observable<ITimeTracker[]> {
  //   endDate = new Date(endDate.setHours(23, 59, 59, 0));
  //   const reportCollection = this.afs.collection<ITimeTracker>('timeTracker', ref => ref.where('studentId', '==', studentId)
  //     .where('createDateTime', '>=', startDate).where('createDateTime', '<=', endDate).orderBy('createDateTime', 'asc'));
  //   const trackerInfo = reportCollection.valueChanges();

  //   return trackerInfo;
  // }



}
