
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';
import { IMessage } from './model/message';



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

}
