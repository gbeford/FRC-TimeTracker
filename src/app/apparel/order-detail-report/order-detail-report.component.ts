import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { OrderService } from '../order.service';
import { IOrderDetails } from '../order-details.model';

@Component({
  selector: 'app-order-detail-report',
  templateUrl: './order-detail-report.component.html',
  styleUrls: ['./order-detail-report.component.scss']
})
export class OrderDetailReportComponent implements OnInit {
  dataSource: MatTableDataSource<IOrderDetails>; // PaidDataSource;
  displayedColumns = ['studentName', 'item', 'quantity', 'grossTotal', 'paid'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  orderDetails: IOrderDetails[];

  constructor(private ordeService: OrderService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getDetails();
  }


  getDetails() {
    this.ordeService.getOrderDetails()
      .subscribe(data => {
        console.log('order details component', data);
        this.orderDetails = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
  }


}
