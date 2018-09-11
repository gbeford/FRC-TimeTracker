
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { IMessage } from '../model/message';
import { Student } from '../model/student';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';
import { Utilities } from '../shared/utils';






@Injectable()
export class MessageService {

    messageList: IMessage[];

    constructor(private http: HttpClient) { }


    // get messages
     getMessageList(): Observable<IMessage[]> {
         return this.http.get<IMessage[]>(environment.messageApiUrl)
    .pipe(
             catchError(Utilities.handleError('getStudents', []))
    );   // ...errors if any


     }



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
