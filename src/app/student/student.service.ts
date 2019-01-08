
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Student } from '../model/student';
import { ITimeTracker } from '../model/time-tracker';
import { environment } from '@environment/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Utilities } from '../shared/utils';


@Injectable()
export class StudentService {

  student: Student[];
  trackerRecord: ITimeTracker;


  constructor(private http: HttpClient) { }


  // get student by id
  getStudent(id: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${environment.baseUrl}${environment.studentApiUrl}/${id}`)
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
    return this.http.get<Student[]>(`${environment.baseUrl}${environment.studentApiUrl}`)
      .pipe(
        catchError(Utilities.handleError)
      );   // ...errors if any
  }




  // log out all students still signed it. This will set's the student hours to 1
  logOutStudents() {
    return this.http.post(`${environment.baseUrl}${environment.signOutAllStudentsUrl}`, {})
      .pipe(
        catchError(Utilities.handleError)
      );
  }

  totalStudentsLogin() {
    // const studentCollection = this.afs.collection<IStudent>('students', ref => ref.where('status', '==', 'in'));
    // return studentCollection.valueChanges();
  }



  signIn_OutStudent(signIn: Student, eventId: number): Observable<Student> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    const options = {
      headers: httpHeaders
    };

    if (!signIn.isSignedIn) {
      return this.http.post<Student>(`${environment.baseUrl}${environment.signInStudentUrl}/${signIn.id}`, eventId as number, options)
        .pipe(
          catchError(Utilities.handleError)
        );
    } else {
      return this.http.post<Student>(`${environment.baseUrl}${environment.signOutStudentUrl}`, signIn.id, options)
        .pipe(
          catchError(Utilities.handleError)
        );
    }

  }




  // CRUD


  editStudentRecord(updateStudent: Student): Observable<void | {}> {
    // const loginDate = today.toISOString().split('T')[0];

    return this.http.put<void>(`${environment.baseUrl}updateStudentUrl/${updateStudent.studentId}`, updateStudent)
      .pipe(
        catchError(Utilities.handleError)
      );

  }

  setMessage(studentId: number, messages: number[]): Observable<void | {}> {
    // this.afs.doc(`students/${studentId}`).set({
    //     messages: messages
    // }, { merge: true });
    return this.http.post<void>(`${environment.baseUrl}${environment.addMessagesToStudentUrl}/${studentId}`, messages )
      .pipe(
        catchError(Utilities.handleError)
      );
  }

}
