import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageService } from '../message.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IMessage } from '../../model/message';
import { MatTableDataSource, MatSort } from '@angular/material';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-add-new-message',
  templateUrl: './add-new-message.component.html',
  styleUrls: ['./add-new-message.component.css']
})
export class AddNewMessageComponent implements OnInit {
  public addMessageForm: FormGroup;
  dataSource: MatTableDataSource<any>; // MessageDataSource;
  messageList: IMessage[];
  displayedColumns = ['messageText'];

  @ViewChild(MatSort) sort: MatSort;


  constructor(private formBuilder: FormBuilder, private messageService: MessageService,
    private changeDetectorRefs: ChangeDetectorRef,
    private titlecasePipe: TitleCasePipe
  ) { }


  ngOnInit() {
    this.createForm();
    this.showMessage();
  }

  showMessage() {
    this.messageService.getMessageList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
    });
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
      this.messageService.saveMessage(this.titlecasePipe.transform(this.addMessageForm.value.messageTxtCtrl)).subscribe(res => {
        this.addMessageForm.reset();
        this.showMessage();
      });
    }

  }

}
