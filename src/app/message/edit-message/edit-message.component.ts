import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageService } from '../message.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IMessage } from '../../model/message';
import { MatTableDataSource, MatSort } from '@angular/material';
import { TitleCasePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


// https://www.npmjs.com/package/@ncstate/sat-popover
// https://stackblitz.com/edit/inline-edit-mat-table?file=app%2Fapp.component.html

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.scss']
})
export class EditMessageComponent implements OnInit {
  public addMessageForm: FormGroup;
  dataSource: MatTableDataSource<any>; // MessageDataSource;
  // messageList: IMessage[];
  displayedColumns = ['editMessage', 'messageText', 'removeMessage'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService,
    private changeDetectorRefs: ChangeDetectorRef,
    private titlecasePipe: TitleCasePipe) { }


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
    if (this.addMessageForm.valid) {
      this.messageService.saveMessage(this.titlecasePipe.transform(this.addMessageForm.value.messageTxtCtrl)).subscribe(res => {
        this.addMessageForm.reset();
        this.showMessage();
      });
    }
  }

  update(el: IMessage, newMessage: string) {
    if (newMessage == null) { return; }
    this.messageService.editMessageRecord(el.messageID, this.titlecasePipe.transform(newMessage)).subscribe(res => {
      this.showMessage();
    });
  }

  deleteMessage(el: number) {
    this.messageService.deleteMessageRecord(el).subscribe((data) => {
      alert('Record Deleted');
      this.showMessage();
      this.addMessageForm.reset();
    });
  }

}
