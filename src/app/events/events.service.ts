import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Utilities } from 'app/shared/utils';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { IEvent } from '../model/event';
import { Observable } from 'rxjs';
import { MAT_SORT_HEADER_INTL_PROVIDER } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  sort_order: number;

  constructor(private http: HttpClient) { }

  // get events
  getEventsList(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${environment.baseUrl}${environment.eventApiUrl}`)
      .pipe(
        tap(ev => console.log('service', ev)),
        catchError(Utilities.handleError)
      );   // ...errors if any
  }

  // CRUD

  saveEvent(msg: string) {
    // const date = new Date();
    console.log('message ' + msg);
    const event: IEvent = {
      eventID: 0,
      description: msg,
      show: true,
      sortOrder: 0
    };

    return this.http.post<IEvent>(`${environment.baseUrl}${environment.messageApiUrl}`, event)
      .pipe(
        catchError(Utilities.handleError)
      );
  }


  editEventRecord(id: number, updateEvent: string): Observable<void | {}> {
    // const loginDate = today.toISOString().split('T')[0];
    console.log(id);
    console.log(updateEvent);

    return this.http.put<void>(`${environment.baseUrl}${environment.messageApiUrl}/${id}`, updateEvent)
      .pipe(
        catchError(Utilities.handleError)
      );
  }



}
