import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-add-new-message',
  templateUrl: './add-new-message.component.html',
  styleUrls: ['./add-new-message.component.css']
})
export class AddNewMessageComponent implements OnInit {
  public addMessageForm: FormGroup;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  submit() {

    this.messageService.saveMessag();
  }

}
