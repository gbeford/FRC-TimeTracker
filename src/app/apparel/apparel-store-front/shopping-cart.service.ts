import { Injectable } from '@angular/core';
import { IApparel } from 'app/model/apparel';
import { ShoppingCart } from 'app/model/shopping-cart';
import { Observer, Observable, BehaviorSubject } from 'rxjs';
import { ClothingService } from '../clothing.service';

import { CartItem } from 'app/model/cart-Item';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private newCartItems: CartItem[] = [];
  private shoppingCart: ShoppingCart;
  private itemTotal: number;
  itemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  order: ShoppingCart[];

  constructor(private clothingService: ClothingService) {
  }

  public addItem(item: CartItem): void {
    // debugger;

    if (item) {
      const price = item.apparel.price * item.quantity;
      item.totalItemPrice = price + item.apparel.nameCharge;
      if (item.size === 'XXL') {
        item.totalItemPrice = item.totalItemPrice + item.apparel.upCharge;
      }
      this.newCartItems.push(item);
    }
    console.log('Service ', this.newCartItems);

    this.itemCount.next(this.newCartItems.length);
    console.log('shopping cart count ', this.itemCount);

    const tempShoppingCart = sessionStorage.getItem('shoppingItems');
    if (tempShoppingCart === null) {
      this.shoppingCart = new ShoppingCart;
    } else {
      this.shoppingCart = JSON.parse(tempShoppingCart) as ShoppingCart;
    }

    this.shoppingCart.items = this.newCartItems;
    for (let i = 0; i < this.newCartItems.length; i++) {
      this.shoppingCart.grossTotal = this.newCartItems[i].totalItemPrice + this.shoppingCart.grossTotal;
    }
    console.log('shopping cart total ', this.shoppingCart.grossTotal);
    sessionStorage.setItem('shoppingItems', JSON.stringify(this.shoppingCart)); // add to session
  }



  retrieveShoppingCart(): ShoppingCart {
    return JSON.parse(sessionStorage.getItem('shoppingItems'));  // retrieven from session
  }


}
