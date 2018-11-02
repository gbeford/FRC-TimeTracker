
import { Component, OnInit } from '@angular/core';
import { Student } from '../../../model/student';


@Component({
  selector: 'app-badge-entry',
  templateUrl: './badge-entry.component.html',
  styleUrls: ['./badge-entry.component.css']
})
export class BadgeEntryComponent implements OnInit {
  studentID : number;

  constructor() { }

  ngOnInit() {
  }


  // autocomplete
  onNotify(value: Student): void {
    this.studentID = value.studentId;
  }

}
