import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-new-message',
  templateUrl: './add-new-message.component.html',
  styleUrls: ['./add-new-message.component.css']
})
export class AddNewMessageComponent implements OnInit {
  public addMessageForm: FormGroup;
  messageCtrl = new FormControl();

  constructor() { }

  ngOnInit() {
  }

  submit() {

  }

}
