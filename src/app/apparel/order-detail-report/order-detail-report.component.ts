import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OrderService } from '../order.service';
import { IOrderDetails } from '../order-details.model';

@Component({
  selector: 'app-order-detail-report',
  templateUrl: './order-detail-report.component.html',
  styleUrls: ['./order-detail-report.component.scss']
})
export class OrderDetailReportComponent implements OnInit {
  dataSource: MatTableDataSource<IOrderDetails>; // PaidDataSource;
  displayedColumns = ['orderNumber', 'studentName', 'item', 'size', 'sleeveName','quantity', 'grossTotal', 'paid'];
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
        console.log('order details', this.orderDetails);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
  }


}
