import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IStudent } from './model/student';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TimeTrackerService {

  constructor(private afs: AngularFirestore) { }

  getStudent(studentId: string): Observable<IStudent[]> {
    const collection = this.afs.collection<IStudent>('students', ref => ref.where('studentId', '==', studentId));
    const student = collection.valueChanges();
    return student;
  }

}
