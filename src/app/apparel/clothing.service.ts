import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { IApparel } from 'app/apparel/apparel-model';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Utilities } from '../shared/utils';
import { Observable, throwError } from 'rxjs';
import { IApparelImage } from 'app/apparel/apparel-image-model';
import { IOrder } from './order-model';

@Injectable({
  providedIn: 'root'
})
export class ClothingService {

  size: string[];

  constructor(private http: HttpClient) { }

  getClothingSize() {
    this.size = ['S', 'M', 'L', 'XL', 'XXL'];
    return this.size;
  }

  // get apparel item
  getApparelList(): Observable<IApparel[]> {
    return this.http.get<IApparel[]>(`${environment.baseUrl}${environment.apparelApiUrl}`)
      .pipe(
        catchError(Utilities.handleError)
      );   // ...errors if any
  }

  // get apparel by id
  getApparelItem(id: string): Observable<IApparel[]> {
    return this.http.get<IApparel[]>(`${environment.baseUrl}${environment.apparelApiUrl}/${id}`)
      .pipe(
        catchError(Utilities.handleError)
      );   // ...errors if any
  }

  getImages(): Observable<IApparelImage[]> {
    return this.http.get<IApparelImage[]>(`${environment.baseUrl}${environment.imageApiUrl}`)
      .pipe(
        catchError(Utilities.handleError)
      );   // ...errors if any
  }

  getImageNames(): Observable<IApparelImage[]> {
    return this.http.get<IApparelImage[]>(`${environment.baseUrl}${environment.imageNameApiUrl}`)
      .pipe(
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

  saveApparelItem(apparelItem: IApparel) {
    return this.http.post<IApparel>(`${environment.baseUrl}${environment.apparelApiUrl}`, apparelItem)
      .pipe(
        catchError(Utilities.handleError)
      );
  }

  saveImage(uploadImage) {
    // this.http is the injected HttpClient
    this.http.post(`${environment.baseUrl}${environment.imageApiUrl}`, uploadImage)
      .subscribe(event => {
        // console.log(event); // handle event here
      });
  }

  savePaidOrder(orderId): Observable<boolean> {
    return this.http.post<boolean>(`${environment.baseUrl}${environment.markPaidOrders}`, orderId);
  }

}

