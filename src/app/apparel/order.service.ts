import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Utilities } from 'app/shared/utils';
import { IOrder } from './order-model';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http: HttpClient) { }


  // get apparel item
  getOrder(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${environment.baseUrl}${environment.orderApiUrl}`)
      .pipe(
        catchError(Utilities.handleError)
      );   // ...errors if any
  }

  // get apparel by id
  getOrderById(id: string): Observable<IOrder> {
    return this.http.get<IOrder>(`${environment.baseUrl}${environment.orderApiUrl}/${id}`)
      .pipe(
        tap(data => console.log('results', data)),
        catchError(Utilities.handleError)
      );   // ...errors if any
  }



  // http://localhost:5000/api/Order/All/
  // /api/Order/{searchBy}/{searchValue}

  // /api/Order/all/anything - return all unpaid orders
  // /api/Order/name/blah - search all unpaid orders with student name containing blah
  // /api/Order/oid/123 - search unpaid orders with order id - 123
  // /api/order/sid/4444 - search unpaid orders with student id 4444

  getUnpaidOrders(searchBy: string, searchValue: string) {
    if (searchBy === 'all') {
      return this.http.get<IOrder[]>(`${environment.baseUrl}api/Order/${searchBy}/null`)
        .pipe(
          catchError(Utilities.handleError)
        );   // ...errors if any
    } else {
      return this.http.get<IOrder[]>(`${environment.baseUrl}api/Order/${searchBy}/${searchValue}`)
        .pipe(
          catchError(Utilities.handleError)
        );
    }
  }



  // CRUD

  deleteOrder(id): Observable<void | {}> {
    console.log('id', id);

    return this.http.delete<void>(`${environment.baseUrl}${environment.orderApiUrl}`, id)
      .pipe(
        catchError(Utilities.handleError)
      );
  }

  savePaidOrder(orderId): Observable<boolean> {
    return this.http.post<boolean>(`${environment.baseUrl}${environment.markPaidOrders}`, orderId);
  }


}
