import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css']
})
export class TimeTrackerComponent implements OnInit {
  title = 'Student Time Tracker';

  public timeTrackerForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() { this.timeTrackerForm = this.createForm(); }

  createForm() {
    const group = this.fb.group({
      name: [''],
      date: [''],
    });
    return group;
  }
  save() {  }


}
