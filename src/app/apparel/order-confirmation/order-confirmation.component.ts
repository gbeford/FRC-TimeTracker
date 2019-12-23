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
  student: string;
  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit() {
    this.getItems();
    this.getToDate();
  }

  getItems() {
    this.shoppingCartService.cart.subscribe(c => {
      this.shoppingCartItems = c;
      this.grossTotal = 0;
      if (this.shoppingCartItems) {
        for (const i of this.shoppingCartItems.items) {
          this.grossTotal = i.totalItemAddedToCartCharge + this.grossTotal;
        }
        this.shoppingCartItems.grossTotal = this.grossTotal;
      }
      this.student = c.studentName;
      console.log('student', this.student);

    });

    console.log('confirm order ', this.shoppingCartItems);
  }

  order() {
    // Save order to api
    this.shoppingCartService.saveOrder(this.shoppingCartItems).subscribe(r => {
      sessionStorage.removeItem('shoppingItems');
      // clear out page after order has been saved
      this.shoppingCartService.clearOutCart();
      this.grossTotal = 0;
      this.router.navigate([`/checkout/${r.orderId}`]);
    });
  }

  remove(item: number) {
    this.shoppingCartService.removeItemFromCart(item);
  }

  getToDate() {
    this.today = Date.now();
  }


}
