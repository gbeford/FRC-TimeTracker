import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Student } from '../../../model/student';
import { IPoints } from '../../../model/points';
import { PointService } from '../point.service';

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
    // this.getPoints();
  }

  // get list of points
  // getPoints() {
  //   this.pointService.getPointList().subscribe(s => {
  //     this.pointsList = s;
  //     console.log('points list ', this.pointsList);
  //   });
  // }


  createForm() {
    this.applyPointsForm = this.formBuilder.group({
      pointCtrl: ['', [<any>Validators.required]],
      clearMessages: ['']
    });
  }

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
  onNotify(value: Student): void {
    this.studentID = value.studentId;
  }

}
