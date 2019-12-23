import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from '../order-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  order: Observable<IOrder>;
  orderId: string;

  constructor(private shoppingCartService: ShoppingCartService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // get ID from URL
    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId');
    this.getOrder() ;
  }

  getOrder() {
    this.order = this.shoppingCartService.getOrderById(this.orderId);

    // .subscribe(data => {
    //   this.order = data;
    //   console.log('order', this.order);
    // });
  }



}
