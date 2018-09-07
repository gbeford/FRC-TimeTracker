
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { IMessage } from '../../model/message';
import { IStudent } from '../../model/student';





@Injectable()
export class MessageService {

    messageList: IMessage[];

    //constructor(private afs: AngularFirestore) { }


    // get messages
    //getMessageList(): Observable<IMessage[]> {
        // const messagesCollection = this.afs.collection<IMessage>('messages', ref => ref.orderBy('sortOrder'));
        // const message = messagesCollection.valueChanges();
        //return message;
    //}



    // CRUD

    saveMessage(msg: string) {
        // const date = new Date();
        console.log('message' + msg);
        const message: IMessage = {
            messageId: null,
            message: msg,
            sortOrder: null,
            show: false
        };

        // const messageCollection = this.afs.collection<IMessage>('messages');
        // messageCollection.add(message);
    }

    setMessage(studentId, messages) {
        // this.afs.doc(`students/${studentId}`).set({
        //     messages: messages
        // }, { merge: true });
    }


}
