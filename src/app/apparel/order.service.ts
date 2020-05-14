import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { catchError, tap, count } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Utilities } from 'app/shared/utils';
import { IOrder } from './order-model';
import { IOrderDetails } from './order-details.model';
import testData from '../apparel/guertin-report/ordersByType.json';
import { IGuertin } from './guertin-report/guertin.model';
import { OrderDetailReportComponent } from './order-detail-report/order-detail-report.component';
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
        //  tap(data => console.log('results', data)),
        catchError(Utilities.handleError)
      );   // ...errors if any
  }

  getOrderItemCounts() {
    const items = testData;
    const result: IGuertin[] = [];
    let orderCount = 0;
    let orders: IGuertin;

    for (let item, i = 0; item = items[i++];) {
      const x = result.find(f => f.size === item.Size && f.item === item.Item);
      const found = item.Item;
      const sizeFound = item.Size;
      // see if item exist
      if (x === undefined) {
        orders = {
          item: item.Item,
          size: item.Size,
          sleeveName: item.SleeveName,
          count: item.Quantity,
        };
        result.push(orders);
      } else {
          x.count += item.Quantity;
      }

         orderCount = item.Quantity + orderCount;
        // see if orders exist

        // if (orders !== undefined) {
        //   if (orders.size !== sizeFound) {
        //     result.push(orders);
        //     orderCount = 1;
        //   }
          // see if item changes
          // if (orders.item !== found) {
          //   orderCount = 0;
          // }
       // }
        // create object
        // orders = {
        //   item: item.Item,
        //   size: item.Size,
        //   sleeveName: item.SleeveName,
        //   count: orderCount,
        // };
      }
      console.log('results', result);
      return result;
    }

 // }


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


  getOrderDetails(): Observable<IOrderDetails[]> {
    return this.http.get<IOrderDetails[]>(`${environment.baseUrl}${environment.orderDetailsApiUrl}`)
      .pipe(
        // tap(data => console.log('order details', data)),
        catchError(Utilities.handleError)
      );   // ...errors if any
  }


  // CRUD

  deleteOrder(id): Observable<void | {}> {
    return this.http.delete<void>(`${environment.baseUrl}${environment.orderApiUrl}/${id}`)
      .pipe(
        catchError(Utilities.handleError)
      );
  }

  savePaidOrder(orderId): Observable<boolean> {
    return this.http.post<boolean>(`${environment.baseUrl}${environment.markPaidOrders}`, orderId);
  }


}
