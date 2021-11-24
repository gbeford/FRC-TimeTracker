import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Utilities } from 'app/shared/utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { IEvent } from '../model/event';
import { Observable } from 'rxjs';

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
        tap(ev =>
          console.log('get events service ', ev)),
        catchError(Utilities.handleError)
      );   // ...errors if any
  }

  // CRUD

  saveEvent(newEvent: string) {
    // console.log('event ' + newEvent);
    const event: IEvent = {
      eventID: 0,
      description: newEvent,
      show: true,
      sortOrder: 0
    };

    return this.http.post<IEvent>(`${environment.baseUrl}${environment.eventApiUrl}`, event)
      .pipe(
        catchError(Utilities.handleError)
      );
  }


  editEventRecord(id: number, updateEvent: string): Observable<void | {}> {
    const data: IEvent = {
      eventID: id,
      description: updateEvent,
      show: true,
      sortOrder: 0
    };

    return this.http.put(`${environment.baseUrl}${environment.eventApiUrl}/${id}`, data)
      .pipe(
        catchError(Utilities.handleError)
      );
  }

  deleteEventRecord(id: number): Observable<void | {}> {
    return this.http.delete<void>(`${environment.baseUrl}${environment.eventApiUrl}/${id}`)
      .pipe(
        catchError(Utilities.handleError)
      );
  }

}
