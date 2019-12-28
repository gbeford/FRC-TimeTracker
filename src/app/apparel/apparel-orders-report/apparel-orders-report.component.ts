import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { IOrder } from '../order-model';

@Component({
  selector: 'app-apparel-orders-report',
  templateUrl: './apparel-orders-report.component.html',
  styleUrls: ['./apparel-orders-report.component.scss']
})
export class ApparelOrdersReportComponent implements OnInit {
order: IOrder[];


  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    this.shoppingCartService.getOrder()
    .subscribe (data => {
      this.order = data;
      console.log('order', this.order);
    });
  }


}
