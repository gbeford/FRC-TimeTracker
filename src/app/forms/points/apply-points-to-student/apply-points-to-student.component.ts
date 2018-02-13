import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IStudent } from 'app/model/student';
import { IPoints } from 'app/model/points';
import { PointService } from 'app/forms/points/point.service';

@Component({
  selector: 'app-apply-points-to-student',
  templateUrl: './apply-points-to-student.component.html',
  styleUrls: ['./apply-points-to-student.component.css']
})
export class ApplyPointsToStudentComponent implements OnInit {
  public applyPointsForm: FormGroup;
  studentID = '';
  pointsList: IPoints[];

  constructor(private formBuilder: FormBuilder, private pointService: PointService) { }

  ngOnInit() {
    this.createForm();
    this.getPoints();
  }

  // get list of messages
  getPoints() {
    // this.messageService.getMessageList().subscribe(s => {
    //   this.messageList = s;
    //   console.log('message ', this.messageList);
    // });
  }


  createForm() {
    this.applyPointsForm = this.formBuilder.group({
      messageCtrl: ['', [<any>Validators.required]],
      clearMessages: ['']
    });
  }

  get clearMessages() { return this.applyPointsForm.get('clearMessages'); }


  submit() {
    // if ((this.studentID !== null) && (this.showMessageForm.valid || this.showMessageForm.value.clearMessages)) {
    //   let messages = [];
    //   if (this.showMessageForm.value.clearMessages) {
    //     messages = [];
    //   } else {
    //     messages = this.showMessageForm.value.messageCtrl;
    //   }

    //   this.messageService.setMessage(this.studentID, messages);
    //   this.showMessageForm.reset();

      // console.log(this.showMessageForm.value.messageCtrl);
      // console.log(this.showMessageForm.value.clearMessages);
    // }
  }
  // autocomplete
  onNotify(value: IStudent): void {
    this.studentID = value.studentId;
  }

}
