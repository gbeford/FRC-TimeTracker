import { Injectable } from '@angular/core';
import { IApparel } from 'app/model/apparel';
import { ShoppingCart } from 'app/model/shopping-cart';
import { Observer, Observable } from 'rxjs';
import { ClothingService } from '../clothing.service';

import { CartItem } from 'app/model/cart-Item';

// https://github.com/jonsamwell/angular-simple-shopping-cart

// const CART_KEY = 'cart';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private newCartItems = [];
  private shoppingCart: ShoppingCart;
  private itemTotal: number;

  constructor(private clothingService: ClothingService) {
  }

  public addItem(item: CartItem): void {
    debugger;

    if (item) {
      const price = item.apparel.price * item.quantity;
      item.totalItemPrice = price + item.apparel.nameCharge + item.apparel.upCharge;
      this.newCartItems.push(item);
    }
    console.log('Service ', this.newCartItems);

    this.shoppingCart = new ShoppingCart;
    this.shoppingCart.items = this.newCartItems;
    for (let i = 0; i <= this.newCartItems.length; i++) {
      this.shoppingCart.grossTotal = this.newCartItems[i].totalItemPrice + this.shoppingCart.grossTotal;
    }
    console.log('shopping cart total ', this.shoppingCart.grossTotal);
  }
  // item.quantity += quantity;
  // cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
  // if (cart.items.length === 0) {
  //   // cart.deliveryOptionId = undefined;
  // }

  // this.calculateCart(cart);
  // this.save(cart);
  // this.dispatch(cart);
  // }

  // private calculateCart(cart: ShoppingCart): void {
  //   cart.itemsTotal = cart.items
  //     .map((item) => item.quantity * this.clothingItems.find((p) => p.apparelId === item.apparelID).price)
  //     .reduce((previous, current) => previous + current, 0);

  //   // add up charge and name charge here?
  //   cart.grossTotal = cart.itemsTotal;
  // }

  // private retrieve(): ShoppingCart {
  //   const cart = new ShoppingCart();
  //   const storedCart = this.storage.getItem(CART_KEY);
  //   if (storedCart) {
  //     cart.updateFrom(JSON.parse(storedCart));
  //   }

  //   return cart;
  // }


}
