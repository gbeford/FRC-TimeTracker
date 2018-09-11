import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IMessage } from '../model/message';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MessageService {

    messageList: IMessage[];

    constructor(private http: HttpClient) { }

    private url = 'http://localhost:5000/api/messages';

    // get messages
    getMessageList(): Observable<IMessage[]> {
        const messages = this.http.get<IMessage[]>(this.url)
            .pipe(
                catchError(this.handleError)
            );
        return messages;
     }



    // CRUD

    saveMessage(msg: string) {
        // const date = new Date();
        console.log('message' + msg);
        const message: IMessage = {
            messageId: null,
            messageText: msg,
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

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}
