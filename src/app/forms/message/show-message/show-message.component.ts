import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMessage } from '../../../model/message';
import { MessageService } from '../message.service';



@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.css']
})
export class ShowMessageComponent implements OnInit {

  messageList: IMessage[];
  public showMessageForm: FormGroup;
  // messageCtrl = new FormControl();
  studentID = '';

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
      messageCtrl: ['', [<any>Validators.required]],
      clearMessages: ['']
    });
  }

  submit() {
    let messages = [];
    if (this.showMessageForm.value.clearMessages) {
      messages = [];
    } else {
      messages = this.showMessageForm.value.messageCtrl;
    }
    console.log(this.showMessageForm.value.messageCtrl);
    this.messageService.setMessage(this.studentID, messages);
    this.showMessageForm.reset();
    // console.log(this.messageCtrl.value);

  }

  onNotify(value: string): void {
    // alert(message);
    this.studentID = value;
  }


}




