import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Utilities } from 'app/shared/utils';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }


  getStudentAttendance(inDate, outDate): Observable<any | {}> {
    return this.http.get<any>(`${environment.baseUrl}${environment.studentAttendanceUrl}?startDate=${inDate}&endDate=${outDate}`)
      .pipe(
        catchError(Utilities.handleError)
      );   // ...errors if any
  }


}
