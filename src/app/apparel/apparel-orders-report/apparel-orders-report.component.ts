import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { IOrder } from '../order-model';
import { MatDialog } from '@angular/material';
import { PaidModalComponent } from '../paid-modal/paid-modal.component';

@Component({
  selector: 'app-apparel-orders-report',
  templateUrl: './apparel-orders-report.component.html',
  styleUrls: ['./apparel-orders-report.component.scss']
})
export class ApparelOrdersReportComponent implements OnInit {
order: IOrder[];


  constructor(private shoppingCartService: ShoppingCartService, public dialog: MatDialog) { }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(PaidModalComponent, {
      width: '650px',
     height: '400px',
      data: {name: 'test', animal: 'this.animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
     // this.animal = result;
    });
  }


}
