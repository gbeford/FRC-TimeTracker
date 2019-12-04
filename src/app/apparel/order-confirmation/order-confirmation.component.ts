import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

import { ShoppingCart } from 'app/apparel/shopping-cart-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  shoppingCartItems: ShoppingCart;
  grossTotal = 0;
  today: number;
  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit() {
    this.getItems();
    this.getToDate();
  }

  getItems() {
    this.shoppingCartItems = this.shoppingCartService.retrieveShoppingCart();
    this.grossTotal = 0;
    if (this.shoppingCartItems) {
      for (const i of this.shoppingCartItems.items) {
        this.grossTotal = i.totalItemAddedToCartCharge + this.grossTotal;
      }
    }
    console.log('retrive order ', this.shoppingCartItems);
  }

  order() {
    debugger;
    // TODO: Save order to api

    // clear out page after order has been saved
    this.shoppingCartService.clearOutCart();
    this.grossTotal = 0;
    this.router.navigate(['/checkout']);
  }


  getToDate() {
    this.today = Date.now();
  }


}
