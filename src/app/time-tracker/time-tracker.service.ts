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
    const studentCollection = this.afs.collection<IStudent>('students', ref => ref.orderBy('lastName'));
    const students = studentCollection.valueChanges();
    return students;
  }

  saveStudentTime(studentID: string, in_time: Date, out_time: Date, timeTotal: number) {
    const date = new Date();

    const trackStudentTime: ITimeTracker = {
      studentId: studentID,
      inTime: in_time,
      outTime: out_time,
      total: timeTotal
    };

  }
}
