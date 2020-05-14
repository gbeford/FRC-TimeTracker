import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-guertin-report',
  templateUrl: './guertin-report.component.html',
  styleUrls: ['./guertin-report.component.scss']
})
export class GuertinReportComponent implements OnInit {

  constructor(private orderService: OrderService, ) { }

  ngOnInit() {
    this.getOrderData();
  }


  getOrderData() {
    const bob = this.orderService.getOrderItemCounts();
    // .subscribe(data => {
    // console.log('guertin report component', data);
    // });
    console.log('bob', bob);
  }
}
