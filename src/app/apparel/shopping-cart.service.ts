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
  itemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  order: ShoppingCart[];
  tempShoppingCart = new BehaviorSubject(new CartItem);

  constructor(private clothingService: ClothingService) {
  }

  public addItem(item: CartItem): void {
    console.log('item', item);
    // TODO   Fix grossTotal and Upcharge charging when shouldnt
    // this.shoppingCart.grossTotal = 0;
    // this.newCartItems = [];
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

    // behavior subject to subscribe to for the item count in the shopping cart in the menu
    this.itemCount.next(this.newCartItems.length);

    const tempShoppingCart = sessionStorage.getItem('shoppingItems');
    if (tempShoppingCart === null) {
      this.shoppingCart = new ShoppingCart();
      sessionStorage.removeItem('shoppingItems');
    } else {
      this.shoppingCart = JSON.parse(tempShoppingCart) as ShoppingCart;
    }

    this.shoppingCart.items = this.newCartItems;

    if (this.shoppingCart.items) {
      let up_charge = 0;
      let name_charge = 0;
      // let total_item_added_to_cart = 0;

      for (const i of this.shoppingCart.items) {
        up_charge = i.quantity * i.upCharge;
        name_charge = i.quantity * i.nameCharge;
        item.totalItemAddedToCartCharge = up_charge + name_charge + i.totalItemPrice;
      }
      // behavior subject to subscribe to get the gross total of the item added to cart
      this.tempShoppingCart.next(item);
    }



    console.log('this.shoppingCart.items', this.shoppingCart.items);

    for (let i = 0; i < this.newCartItems.length; i++) {
      this.shoppingCart.grossTotal = this.newCartItems[i].totalItemAddedToCartCharge + this.shoppingCart.grossTotal;
    }

    console.log('shopping cart total ', this.shoppingCart.grossTotal);
    sessionStorage.setItem('shoppingItems', JSON.stringify(this.shoppingCart)); // add to session
  }



  retrieveShoppingCart(): ShoppingCart {
    return JSON.parse(sessionStorage.getItem('shoppingItems'));  // retrieven from session
  }

  orderItems() {
    // Add code to save order
    sessionStorage.removeItem('shoppingItems');
  }

}
