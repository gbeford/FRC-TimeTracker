import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../shopping-cart-model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  order: ShoppingCart[];

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {

  }

  // TODO call api to display what was ordered and display a receipt

  getAppareal() {
    this.shoppingCartService.getOrder().subscribe(data => {
      console.log('order', data);
      this.order = data;
    });
  }


}
