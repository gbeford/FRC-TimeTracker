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
        return this.http.get<IMessage[]>(`${environment.baseUrl}${environment.messageApiUrl}`)
            .pipe(
                catchError(Utilities.handleError)
            );   // ...errors if any
    }


    // CRUD

    saveMessage(msg: string) {
        // const date = new Date();
        console.log('message ' + msg);
        const message: IMessage = {
            messageID: 0,
            messageText: msg
        };

        return this.http.post<IMessage>(`${environment.baseUrl}${environment.messageApiUrl}`, message)
            .pipe(
                catchError(Utilities.handleError)
            );
    }



    editMessageRecord(id: number, updateMessage: string): Observable<void | {}> {
        // const loginDate = today.toISOString().split('T')[0];
        console.log(id);
        console.log(updateMessage);

        return this.http.put<void>(`${environment.baseUrl}${environment.messageApiUrl}/${id}`, updateMessage)
            .pipe(
                catchError(Utilities.handleError)
            );
    }


    initializeMessage(): IMessage {
        // Return an initialized object
        return {
            messageID: 0,
            messageText: null
        };
    }

}
