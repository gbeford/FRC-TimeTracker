import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

import { ShoppingCart } from 'app/apparel/shopping-cart-model';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  shoppingCartItems: ShoppingCart;
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.getItems();

  }

  getItems() {
    this.shoppingCartItems = this.shoppingCartService.retrieveShoppingCart();
    console.log('retrive order ', this.shoppingCartItems);
  }


}
