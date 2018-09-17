import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageService } from '../message.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IMessage } from '../../model/message';
import { MatTableDataSource, MatSort } from '@angular/material';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.css']
})
export class EditMessageComponent implements OnInit {
  public addMessageForm: FormGroup;
  dataSource: MatTableDataSource<any>; // MessageDataSource;
  messageList: IMessage[];
  displayedColumns = ['messageId', 'messageText'];

  @ViewChild(MatSort) sort: MatSort;


  constructor(private formBuilder: FormBuilder, private messageService: MessageService,
    private changeDetectorRefs: ChangeDetectorRef,
    private titlecasePipe: TitleCasePipe,
    private route: ActivatedRoute) {

  }


  ngOnInit() {
    this.createForm();
    this.showMessage();

    // this.route.data.subscribe(data => {
    //   this.messageList = data['messageList'];
    //   this.populateForm();
    // })
  }

  showMessage() {
    this.messageService.getMessageList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
      console.log('show message ', data);
    });
  }

  get messageText() { return this.addMessageForm.get('messageTxtCtrl'); }

  private createForm() {
    this.addMessageForm = this.formBuilder.group({
      messageTxtCtrl: ['', Validators.required]
    });
  }

  // populateForm() {
  //   this.addMessageForm.patchValue({
  //     messageTxtCtrl: this.messageList.messageText,
  //   });
  // }


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
