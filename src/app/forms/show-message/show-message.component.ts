import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMessage } from '../model/message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.css']
})
export class ShowMessageComponent implements OnInit {

  messageList: IMessage[];
  public showMessageForm: FormGroup;
  messageCtrl = new FormControl();


  constructor(private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.createForm();
    this.getMessages();
  }

  // get list of messages
  getMessages() {
    this.messageService.getMessageList().subscribe(s => {
      this.messageList = s;
      console.log('message ', this.messageList);


    });
  }

  createForm() {
    this.showMessageForm = this.formBuilder.group({
      messageCtrl: ['', [<any>Validators.required]]
    });
    this.showMessageForm.valueChanges.subscribe(v => console.log);
  }

  submit() {
    this.showMessageForm.reset();

  }




}




