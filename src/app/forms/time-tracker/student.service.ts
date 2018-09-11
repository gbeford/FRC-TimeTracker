
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Student } from '../../model/student';
import { ITimeTracker } from '../../model/time-tracker';
import { environment } from '@environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class StudentService {

  student: Student[];
  trackerRecord: ITimeTracker;


  constructor(private http: HttpClient) { }


  // get student by id
  getStudent(id: string): Observable<Student[]> {
    return this.http.get<Student[]>('${environment.studentApiUrl}/${id}')
      .pipe(
        catchError(this.handleError('getStudents', []))
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
        catchError(this.handleError('getStudents', []))
      );   // ...errors if any
  }




  // log out all students still signed it. This will set's the student hours to 1
  logOutStudents() {
    return this.http.post(environment.signOutAllStudentsUrl, {})
      .pipe(
        catchError(this.handleError('signInStudent', {}))
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
          catchError(this.handleError('signInStudent', signIn))
        );
    } else {
      return this.http.post<Student>(environment.signOutStudentUrl, signIn.studentId)
        .pipe(
          catchError(this.handleError('signInStudent', signIn))
        );
    }

  }




  // CRUD


  editStudentRecord(updateStudent: Student): Observable<void | {}> {
    // const loginDate = today.toISOString().split('T')[0];

    return this.http.put<void>(`environment.updateStudentUrl/${updateStudent.studentId}`, updateStudent)
      .pipe(
        catchError(this.handleError('updateStudent'))
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






  // generic functions

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
