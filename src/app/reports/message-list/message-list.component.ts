import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IMessage } from '../../forms/model/message';
import { MessageService } from '../../forms/message.service';
import { MatTableDataSource, MatSort } from '@angular/material';
// import { DataSource } from '@angular/cdk/collections';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements AfterViewInit {

  dataSource: MatTableDataSource<any>; // MessageDataSource;
  messageList: IMessage[];
  displayedColumns = ['message', 'sortOrder', 'show'];

  @ViewChild(MatSort) sort: MatSort;


  constructor(private messageService: MessageService) { }

  // ngOnInit() {
  // }

  ngAfterViewInit() {
    this.messageService.getMessageList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;

    });
  }

}
// export class StudentsDataSource extends DataSource<any> {
//   constructor(private messages: Observable<IMessage[]>) {
//     super();
//   }

//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<IMessage[]> {
//     return this.messages;
//   }

//   disconnect() { }



// }
