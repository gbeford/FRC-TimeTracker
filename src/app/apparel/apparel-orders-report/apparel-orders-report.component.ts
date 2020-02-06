import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { IOrder } from '../order-model';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { PaidModalComponent } from '../paid-modal/paid-modal.component';

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

  constructor(private shoppingCartService: ShoppingCartService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    this.shoppingCartService.getOrder()
      .subscribe(data => {
        this.order = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
  }

  deleteOrder(el: number) {
    // this.eventService.deleteEventRecord(el).subscribe((data) => {
      alert('Order was deleted successfully.');
    //   this.alertMessage = 'Order was deleted successfully.';
    //   this.success = true;
    //   this.showEvents();
    //   this.addEventForm.reset();
    // });
  }

  // private getStudentList() {
  //   this.sls.getStudents().subscribe(data => {
  //     this.dataSource = new MatTableDataSource(data);
  //     this.dataSource.sort = this.sort;
  //   });
  // }






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
