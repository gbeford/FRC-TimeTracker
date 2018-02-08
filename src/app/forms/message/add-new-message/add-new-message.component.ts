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
  messageTxtCtrl = new FormControl();

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) { }


  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.addMessageForm = this.formBuilder.group({
      messageTxtCtrl: new FormControl('', Validators.required),
    });
  }

  submit() {
    console.log(this.messageTxtCtrl.value);
    // this.messageService.saveMessage(this.messageTxtCtrl.value);
    this.addMessageForm.reset();
  }

}
