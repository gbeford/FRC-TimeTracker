import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMessage } from '../../model/message';
import { MessageService } from '../message.service';
import { Student } from '../../model/student';
import { StudentService } from 'app/student/student.service';



@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.css']
})
export class ShowMessageComponent implements OnInit {

  messageList: IMessage[];
  public showMessageForm: FormGroup;
  studentID: number;
  show = true;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService,
    private studentService:StudentService) { }

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

      this.studentService.setMessage(this.studentID, messages);
      this.showMessageForm.reset();

      // console.log(this.showMessageForm.value.messageCtrl);
      // console.log(this.showMessageForm.value.clearMessages);
    }
  }

// autocomplete
  onNotify(value: Student): void {
    this.studentID = value.studentId;
  }


}




