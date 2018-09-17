import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
                catchError(Utilities.handleError)
            );   // ...errors if any
    }


    public getMessage(id: number): Observable<IMessage> {
        if (id === 0) {
            return Observable.of(this.initializeMessage());
        }
        // ...using get request
        // return this.http.get<IMessage[]>(environment.messageApiUrl)
        //     .pipe(
        //         catchError(Utilities.handleError)
        //     );   // ...errors if any
    }

    // CRUD

    saveMessage(msg: string) {
        // const date = new Date();
        console.log('message ' + msg);
        const message: IMessage = {
            messageId: 0,
            messageText: msg,
            sortOrder: 0,
            show: false
        };

        return this.http.post<IMessage>(environment.messageApiUrl, message)
            .pipe(
                catchError(Utilities.handleError)
            );

        // const messageCollection = this.afs.collection<IMessage>('messages');
        // messageCollection.add(message);
    }

    setMessage(studentId, messages) {
        // this.afs.doc(`students/${studentId}`).set({
        //     messages: messages
        // }, { merge: true });
    }

    editMessageRecord(updateMessage: IMessage): Observable<void | {}> {
        // const loginDate = today.toISOString().split('T')[0];

        return this.http.put<void>(`environment.messageApiUrl/${updateMessage.messageId}`, updateMessage)
            .pipe(
                catchError(Utilities.handleError)
            );

    }


    initializeMessage(): IMessage {
        // Return an initialized object
        return {
            messageId: 0,
            messageText: null,
            sortOrder: 0,
            show: false,
        };
    }

}
