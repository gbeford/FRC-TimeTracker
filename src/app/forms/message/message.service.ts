
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';
import { IMessage } from '../../model/message';





@Injectable()
export class MessageService {

    messageList: IMessage[];

    constructor(private afs: AngularFirestore) { }


    // get messages
    getMessageList(): Observable<IMessage[]> {
        const messagesCollection = this.afs.collection<IMessage>('messages', ref => ref.orderBy('sortOrder'));
        const message = messagesCollection.valueChanges();
        return message;
    }



    // CRUD

    saveMessage(msg: string) {
        // const date = new Date();

    const message: IMessage = {
        messageId: null,
        message: msg,
        sortOrder: null,
        show: false
        };

    const messageCollection = this.afs.collection<IMessage>('messages');
    messageCollection.add(message);

        // const studentCollection = this.afs.doc(`students/${student.studentId}`);
        // student.status = 'in';
        // student.checkInTime = date;
        // studentCollection.set(student, { merge: true });
    }

    // updateStudentTime(student: IStudent) {
    //     // const date = new Date(2018, 0, 10, 21, 0, 0);
    //     const date = new Date();
    //     const createDate = this.formatDate(date);
    //     console.log(createDate);
    //     const timeCollection = this.afs.collection<ITimeTracker>('timeTracker', ref => ref.where('studentId', '==', student.studentId)
    //         .where('createDate', '==', createDate).where('outTime', '==', null));

    //     const toUpdate = timeCollection.snapshotChanges().map(actions => {
    //         return actions.map(action => {
    //             const data = action.payload.doc.data() as ITimeTracker;
    //             const id = action.payload.doc.id;
    //             return { id, ...data };
    //         });
    //     });

    //     const tempUpdateSub = toUpdate.subscribe(val => {

    //         const inTime = val[0].inTime;
    //         const compareTimes = date.getTime() - inTime.getTime();
    //         const totalTime = Math.round((compareTimes / (1000 * 60 * 60) * 100)) / 100;
    //         const totalPoints = Math.floor(((totalTime * 60) / 60) / 2.5);

    //         tempUpdateSub.unsubscribe();

    //         this.afs.doc(`timeTracker/${val[0].id}`).set({
    //             outTime: date,
    //             totalHrs: totalTime,
    //             points: totalPoints
    //         }, { merge: true });

    //         this.afs.doc(`students/${student.studentId}`).set({
    //             status: 'out',
    //             checkInTime: null
    //         }, { merge: true });
    //     });
    // }




}
