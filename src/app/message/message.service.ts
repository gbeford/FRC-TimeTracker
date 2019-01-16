import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IMessage } from '../model/message';
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
        const data: IMessage = {
            messageID: id,
            messageText: updateMessage
        };

        return this.http.put<void>(`${environment.baseUrl}${environment.messageApiUrl}/${id}`, data)
            .pipe(
                catchError(Utilities.handleError)
            );
    }

    deleteMessageRecord(id: number): Observable<void | {}> {
        return this.http.delete<void>(`${environment.baseUrl}${environment.messageApiUrl}/${id}`)
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
