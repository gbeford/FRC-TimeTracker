import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { IMessage } from '../../model/message';
import { MessageService } from '../../forms/message/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements AfterViewInit {

  dataSource: MatTableDataSource<any>; // MessageDataSource;
  messageList: IMessage[];
  displayedColumns = ['message'];

  @ViewChild(MatSort) sort: MatSort;


  constructor(private messageService: MessageService) { }

  ngAfterViewInit() {
    // this.messageService.getMessageList().subscribe(data => {
    //   this.dataSource = new MatTableDataSource(data);
    //   this.dataSource.sort = this.sort;

    // });
  }

}

