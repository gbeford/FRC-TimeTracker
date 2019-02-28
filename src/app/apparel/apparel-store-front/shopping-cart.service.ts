import { Injectable } from '@angular/core';
import { IApparel } from 'app/model/apparel';
import { IShoppingCart } from 'app/model/shopping-cart';
import { ICartItem } from 'app/model/cart-item';
import { Observer, Observable } from 'rxjs';


const CART_KEY = 'cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private storage: Storage;
  private subscriptionObservable: Observable<IShoppingCart>;
  private subscribers: Array<Observer<IShoppingCart>> = new Array<Observer<IShoppingCart>>();

  constructor() { }

  public addItem(apparel: IApparel, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.apparelID === apparel.apparelId);
    if (item === undefined) {
      item = new ICartItem();
      item.apparelID = apparel.apparelId;
      cart.items.push(item);
    }

  }


  private retrieve(): IShoppingCart {
    const cart = new IShoppingCart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }


}
