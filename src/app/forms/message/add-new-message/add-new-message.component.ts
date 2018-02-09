import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-new-message',
  templateUrl: './add-new-message.component.html',
  styleUrls: ['./add-new-message.component.css']
})
export class AddNewMessageComponent implements OnInit {
  public addMessageForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private messageService: MessageService) { }


  ngOnInit() {
    this.createForm();
  }

  get messageText() { return this.addMessageForm.get('messageTxtCtrl'); }

  private createForm() {
    this.addMessageForm = this.formBuilder.group({
      messageTxtCtrl: ['', Validators.required]
    });
  }

  submit() {
    // console.log(this.addMessageForm.value.messageTxtCtrl);

    if (this.addMessageForm.valid) {
      this.messageService.saveMessage(this.addMessageForm.value.messageTxtCtrl);
      this.addMessageForm.reset();
    }
  }

}
