import { Injectable } from '@angular/core';
import { IPoints } from '../../model/points';
import { Observable } from '@firebase/util';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class PointService {

  constructor(private afs: AngularFirestore) { }


  // get messages
  getPointList(): Observable<IPoints[]> {
    const pointsCollection = this.afs.collection<IPoints>('events', ref => ref.orderBy('sortOrder'));
    const points = pointsCollection.valueChanges();
    return points;
  }


  // CRUD

  savePoint(msg: string) {
    // const date = new Date();
    // console.log('message' + msg);
    // const message: IMessage = {
    //   messageId: null,
    //   message: msg,
    //   sortOrder: null,
    //   show: false
    // };

    // const messageCollection = this.afs.collection<IMessage>('messages');
    // messageCollection.add(message);
  }

}
