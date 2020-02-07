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

      // lets the subscribers know there is a change to the cart - update cart icon (behavior subject for use in other pages)
      this.cart.next(this.shoppingCart);

      // lets the subscribers know the item that was just added to the cart
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
      // update menu shopping cart number
      this.cart.next(this.shoppingCart);
    }
  }

  // CRUD
  saveOrder(cart: ShoppingCart): Observable<IOrder> {
    // make image data an empty string as we dont want save it here
    cart.items.forEach(item => {
      item.apparel.image = '';
    });

    const order: IOrder = {
      items: cart.items,
      orderDate: new Date(),
      studentName: cart.studentName,
      studentId: cart.studentID,
      orderId: 0,
      grossTotal: cart.grossTotal,
    };

    return this.http.post<IOrder>(`${environment.baseUrl}${environment.orderApiUrl}`, order)
      .pipe(
        catchError(Utilities.handleError)
      );
  }





}
