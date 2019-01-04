import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Utilities } from 'app/shared/utils';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { IEvent } from '../model/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  // get events
  getMEventsList(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${environment.baseUrl}${environment.eventApiUrl}`)
      .pipe(
        tap(ev => console.log('service', ev)),
        catchError(Utilities.handleError)
      );   // ...errors if any
  }

}
