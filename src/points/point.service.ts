import { Injectable } from '@angular/core';
import { IPoints } from 'app/model/points';


import { Observable } from 'rxjs/Observable';

@Injectable()
export class PointService {

  // constructor(private afs: AngularFirestore) { }


  // get points
  // getPointList(): Observable<IPoints[]> {
    // const pointsCollection = this.afs.collection<IPoints>('Events', ref => ref.orderBy('SortOrder'));
    // const points = pointsCollection.valueChanges();
    // return points;
  // }


  // CRUD

  savePoint(msg: string) {
    const date = new Date();
    const points: IPoints = {
      eventId: null,
      Points: 0,
      Description: msg,
      SortOrder: null,
      Show: false
    };

    // const messageCollection = this.afs.collection<IMessage>('messages');
    // messageCollection.add(message);
  }

}
