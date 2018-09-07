import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMessage } from '../../../model/message';
import { MessageService } from '../message.service';
import { IStudent } from '../../../model/student';



@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.css']
})
export class ShowMessageComponent implements OnInit {

  messageList: IMessage[];
  public showMessageForm: FormGroup;
  studentID = '';
  show = true;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.createForm();
    //this.getMessages();
  }

  // get list of messages
  // getMessages() {
  //   this.messageService.getMessageList().subscribe(s => {
  //     this.messageList = s;
  //     console.log('message ', this.messageList);
  //   });
  // }


  get clearMessages() { return this.showMessageForm.get('clearMessages'); }

  createForm() {
    this.showMessageForm = this.formBuilder.group({
      messageCtrl: ['', [<any>Validators.required]],
      clearMessages: ['']
    });
  }

  hideMessage() {
    this.show = false;
  }

  submit() {
    if ((this.studentID !== null) && (this.showMessageForm.valid || this.showMessageForm.value.clearMessages)) {
      let messages = [];
      if (this.showMessageForm.value.clearMessages) {
        messages = [];
      } else {
        messages = this.showMessageForm.value.messageCtrl;
      }

      this.messageService.setMessage(this.studentID, messages);
      this.showMessageForm.reset();

      // console.log(this.showMessageForm.value.messageCtrl);
      // console.log(this.showMessageForm.value.clearMessages);
    }
  }

// autocomplete
  onNotify(value: IStudent): void {
    this.studentID = value.studentId;
  }


}




