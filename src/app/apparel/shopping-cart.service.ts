import { Injectable } from '@angular/core';
import { ShoppingCart } from 'app/apparel/shopping-cart-model';
import { Observer, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartItem } from 'app/apparel/cart-Item';
import { ClothingService } from './clothing.service';
import { environment } from '@environment/environment';
import { Utilities } from 'app/shared/utils';
import { catchError, tap } from 'rxjs/operators';
import { Student } from 'app/model/student';
import { IOrder } from '../apparel/order-model';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private shoppingCart: ShoppingCart;
  private itemTotal: number;
  cart: BehaviorSubject<ShoppingCart>;
  order: ShoppingCart[];
  tempShoppingCartItem = new BehaviorSubject(new CartItem);

  constructor(private clothingService: ClothingService, private http: HttpClient) {
    this.setUpCart();
    this.cart = new BehaviorSubject<ShoppingCart>(this.shoppingCart);
  }

  public addItem(item: CartItem): void {
    if (item) {
      item.price = item.apparel.price * item.quantity;

      if (item.size === 'XXL') {
        item.upCharge = item.apparel.upCharge;
      } else {
        item.upCharge = 0;
      }

      if (item.sleeveName != null) {
        item.nameCharge = item.apparel.nameCharge;
      } else {
        item.nameCharge = 0;
      }

      this.shoppingCart.items.push(item);
    }

    if (this.shoppingCart.items) {
      let up_charge = 0;
      let name_charge = 0;

      for (const i of this.shoppingCart.items) {
        up_charge = i.quantity * i.upCharge;
        name_charge = i.quantity * i.nameCharge;
        item.totalItemAddedToCartCharge = up_charge + name_charge + i.price;
      }

      // gets the shopping cart (behavior subject for use in other pages)
      this.cart.next(this.shoppingCart);

      // gets the current item that was added to the cart  (behavior subject to subscribe)
      this.tempShoppingCartItem.next(item);
    }

    // add to session
    sessionStorage.setItem('shoppingItems', JSON.stringify(this.shoppingCart));
  }

  AddStudentIdToCart(student: Student) {
    this.shoppingCart.studentID = student.studentId;
    this.shoppingCart.studentName = student.firstName + ' ' + student.lastName;
  }

  clearOutCart() {
    this.shoppingCart = new ShoppingCart;
    sessionStorage.removeItem('shoppingItems');
    // update menu shopping cart number
    this.cart.next(this.shoppingCart);
  }

  removeItemFromCart(item: number) {
    const itemIndex = this.shoppingCart.items.findIndex(i => i.apparel.apparelId === item);
    this.shoppingCart.items.splice(itemIndex, 1);
    sessionStorage.setItem('shoppingItems', JSON.stringify(this.shoppingCart));

    // update menu shopping cart number
    this.cart.next(this.shoppingCart);
  }

  // retrieve from session
  retrieveShoppingCart(): ShoppingCart {
    return JSON.parse(sessionStorage.getItem('shoppingItems'));
  }

  setUpCart() {
    const tempShoppingCart = sessionStorage.getItem('shoppingItems');
    if (tempShoppingCart === null) {
      this.shoppingCart = new ShoppingCart();
    } else {
      this.shoppingCart = JSON.parse(tempShoppingCart) as ShoppingCart;
    }
    if (this.cart) {
      this.cart.next(this.shoppingCart);
    }
  }

  // CRUD
  saveOrder(cart: ShoppingCart): Observable<IOrder> {
    return this.http.post<IOrder>(`${environment.baseUrl}${environment.orderApiUrl}`, cart)
      .pipe(
        catchError(Utilities.handleError)
      );
  }

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
