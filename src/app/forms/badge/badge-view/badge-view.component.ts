import { Component, OnInit } from '@angular/core';
import { Student } from '../../../model/student';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-badge-view',
  templateUrl: './badge-view.component.html',
  styleUrls: ['./badge-view.component.css']
})
export class BadgeViewComponent implements OnInit {
  studentID = '';
  public badgeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  createForm() {
    this.badgeForm = this.formBuilder.group({

    });
  }

  // autocomplete
  onNotify(value: Student): void {
    this.studentID = value.studentId;
  }

}
