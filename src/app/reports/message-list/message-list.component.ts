import { Component, OnInit } from '@angular/core';
import { IMessage } from '../../forms/model/message';
import { MessageService } from '../../forms/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {


  messageList: IMessage[];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }


  // get list of messages
  getMessages() {
    this.messageService.getMessageList().subscribe(s => {
      this.messageList = s;
    });
  }
}
