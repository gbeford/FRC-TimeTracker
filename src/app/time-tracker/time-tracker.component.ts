import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TimeTrackerService } from './time-tracker.service';
import { Observable } from 'rxjs/Observable';
import { IStudent } from './model/student';

@Component({
  selector: 'app-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css']
})
export class TimeTrackerComponent implements OnInit {
  title = '';
  enterBtn = '';
  in = '';
  student: IStudent[];
  public timeTrackerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private timeTrackerService: TimeTrackerService) { }

  ngOnInit( ): void {
    this.createForm();
  }


  createForm() {
    this.timeTrackerForm = this.formBuilder.group({
      studentID: ['', , [<any>Validators.required, <any>Validators.maxLength(25)]],
      date: [''],
    });
  }


  getStudentInfo() {
     this.timeTrackerService.getStudent(this.timeTrackerForm.controls['studentID'].value).subscribe(s => this.student = s);
    }


  checkIfSignedIn() {

    if (this.in) {
      this.enterBtn = 'In';
    } else {
      this.enterBtn = 'out';
    }
}

  save() { }

}
