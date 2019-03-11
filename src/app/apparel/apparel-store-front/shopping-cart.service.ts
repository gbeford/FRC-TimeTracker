import { Injectable } from '@angular/core';
import { IApparel } from 'app/model/apparel';
import { ShoppingCart } from 'app/model/shopping-cart';
import { Observer, Observable } from 'rxjs';
import { ClothingService } from '../clothing.service';
import { StorageService } from './storage.service';
import { CartItem } from 'app/model/cart-Item';

// https://github.com/jonsamwell/angular-simple-shopping-cart

// const CART_KEY = 'cart';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  // private clothingItems: IApparel[];

  private newCartItems = [];


  constructor(private storageService: StorageService,
    private clothingService: ClothingService) {

    // this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
    //   this.subscribers.push(observer);
    //   observer.next(this.retrieve());
    //   return () => {
    //     this.subscribers = this.subscribers.filter((obs) => obs !== observer);
    //   };
    // });
  }

  public addItem(item: CartItem): void {
    debugger;

    if (item) {
      this.newCartItems.push(item);
    }
    // item.quantity += quantity;
    // cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    // if (cart.items.length === 0) {
    //   // cart.deliveryOptionId = undefined;
    }

    //this.calculateCart(cart);
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
