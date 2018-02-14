
import { Component, OnInit } from '@angular/core';
import { IStudent } from '../../../model/student';


@Component({
  selector: 'app-badge-entry',
  templateUrl: './badge-entry.component.html',
  styleUrls: ['./badge-entry.component.css']
})
export class BadgeEntryComponent implements OnInit {
  studentID = '';

  constructor() { }

  ngOnInit() {
  }


  // autocomplete
  onNotify(value: IStudent): void {
    this.studentID = value.studentId;
  }

}
