import { Component, OnInit } from '@angular/core';
import { IStudent } from '../../../model/student';

@Component({
  selector: 'app-badge-view',
  templateUrl: './badge-view.component.html',
  styleUrls: ['./badge-view.component.css']
})
export class BadgeViewComponent implements OnInit {
  studentID = '';

  constructor() { }

  ngOnInit() {
  }



  // autocomplete
  onNotify(value: IStudent): void {
    this.studentID = value.studentId;
  }

}
