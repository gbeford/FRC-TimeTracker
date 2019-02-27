import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { IApparel } from 'app/model/apparel';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Utilities } from '../shared/utils';
import { Observable, throwError } from 'rxjs';
import { IApparelImage } from 'app/model/apparel-image';

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

  // saveCartItem(cartItem: IApparel) {
  //   return this.http.post<IApparel>(`${environment.baseUrl}${environment.apparelApiUrl}`, apparelItem)
  //     .pipe(
  //       catchError(Utilities.handleError)
  //     );
  // }

  // editApparelRecord(id: number, updateMessage: string): Observable < void | {} > {
  //   const data: IMessage = {
  //     messageID: id,
  //     messageText: updateMessage
  //   };

  //   return this.http.put<void>(`${environment.baseUrl}${environment.apparelApiUrl}/${id}`, data)
  //     .pipe(
  //       catchError(Utilities.handleError)
  //     );
  // }

  // deleteMessageRecord(id: number): Observable < void | {} > {
  //   return this.http.delete<void>(`${environment.baseUrl}${environment.apparelApiUrl}/${id}`)
  //     .pipe(
  //       catchError(Utilities.handleError)
  //     );
  // }



}

