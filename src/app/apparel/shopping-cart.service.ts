import { Injectable } from '@angular/core';
import { IApparel } from 'app/apparel/apparel-model';
import { ShoppingCart } from 'app/apparel/shopping-cart-model';
import { Observer, Observable, BehaviorSubject } from 'rxjs';


import { CartItem } from 'app/model/cart-Item';
import { ClothingService } from './clothing.service';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private newCartItems: CartItem[] = [];
  private shoppingCart: ShoppingCart;
  private itemTotal: number;
  cart: BehaviorSubject<ShoppingCart>;
  order: ShoppingCart[];
  tempShoppingCartItem = new BehaviorSubject(new CartItem);

  constructor(private clothingService: ClothingService) {
    this.setUpCart();
    this.cart = new BehaviorSubject<ShoppingCart>(this.shoppingCart);
  }

  public addItem(item: CartItem): void {
    console.log('item', item);
    if (item) {
      item.totalItemPrice = item.apparel.price * item.quantity;

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

      this.newCartItems.push(item);
    }
    console.log('newCartItems ', this.newCartItems);

    this.setUpCart();

    this.shoppingCart.items = this.newCartItems;

    // add shopping cart to the behavior subject for use in other pages
    this.cart.next(this.shoppingCart);

    if (this.shoppingCart.items) {
      let up_charge = 0;
      let name_charge = 0;

      for (const i of this.shoppingCart.items) {
        up_charge = i.quantity * i.upCharge;
        name_charge = i.quantity * i.nameCharge;
        item.totalItemAddedToCartCharge = up_charge + name_charge + i.totalItemPrice;
      }
      // behavior subject to subscribe to get the what item was just added to the cart
      this.tempShoppingCartItem.next(item);
    }

// add to session
    sessionStorage.setItem('shoppingItems', JSON.stringify(this.shoppingCart));
  }

  clearOutCart() {
    this.shoppingCart = new ShoppingCart;
    sessionStorage.removeItem('shoppingItems');
    this.cart.next(this.shoppingCart);
  }

  retrieveShoppingCart(): ShoppingCart {
    return JSON.parse(sessionStorage.getItem('shoppingItems'));  // retrieven from session
  }

  orderItems() {
    // Add code to save order
    sessionStorage.removeItem('shoppingItems');
  }

  setUpCart() {
     const tempShoppingCart = sessionStorage.getItem('shoppingItems');
    if (tempShoppingCart === null) {
      this.shoppingCart = new ShoppingCart();
    } else {
      this.shoppingCart = JSON.parse(tempShoppingCart) as ShoppingCart;
    }
  }


}
