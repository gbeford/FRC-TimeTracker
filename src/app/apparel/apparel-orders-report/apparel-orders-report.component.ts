import { Component, OnInit, ViewChild } from '@angular/core';
import { IOrder } from '../order-model';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { PaidModalComponent } from '../paid-modal/paid-modal.component';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-apparel-orders-report',
  templateUrl: './apparel-orders-report.component.html',
  styleUrls: ['./apparel-orders-report.component.scss']
})
export class ApparelOrdersReportComponent implements OnInit {
  dataSource: MatTableDataSource<IOrder>; // PaidDataSource;

  displayedColumns = ['orderId', 'studentId', 'studentName', 'grossTotal', 'paid', 'removeOrder'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  order: IOrder[];

  constructor(private ordeService: OrderService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    this.ordeService.getOrder()
      .subscribe(data => {
        this.order = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
  }

  deleteOrder(el: number) {
    this.ordeService.deleteOrder(el).subscribe((data) => {
      alert('Order was deleted successfully.');
      // this.alertMessage = 'Order was deleted successfully.';
      // this.success = true;
      this.getOrder();
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PaidModalComponent, {
      width: '650px',
      height: '400px',
      data: { name: 'test', animal: 'this.animal' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.getOrder();
    });
  }


}
