import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from '../order-model';
import { Observable } from 'rxjs';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  order: Observable<IOrder>;
  orderId: string;

  constructor(private shoppingCartService: ShoppingCartService, private activatedRoute: ActivatedRoute,
    private ordeService: OrderService) { }

  ngOnInit() {
    // get ID from URL
    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId');
    this.getOrder() ;
  }

  getOrder() {
    // using | async in html
    this.order = this.ordeService.getOrderById(this.orderId);

    // .subscribe(data => {
    //   this.order = data;
    //   console.log('order', this.order);
    // });
  }

}
