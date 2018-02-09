import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, tap, startWith, debounceTime } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { TimeTrackerService } from './time-tracker.service';
import { IStudent } from '../../model/student';


@Component({
  selector: 'app-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css']
})
export class TimeTrackerComponent implements OnInit {
  title = 'Hours / Points Tracker';
  enterBtn = '';
  in = '';
  students: IStudent[];
  selectedStudent: IStudent;
  public timeTrackerForm: FormGroup;
  filteredOptions: Observable<IStudent[]>;

  constructor(private formBuilder: FormBuilder,
    private timeTrackerService: TimeTrackerService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllStudents();
  }

  createForm() {
    console.log('here');
    this.timeTrackerForm = this.formBuilder.group({
    });
  }

  // get list of students for autoComplete
  getAllStudents() {
    this.timeTrackerService.getStudents().subscribe(s => {
      this.students = s;
    });
  }

  checkIfSignedIn() {
    if (this.selectedStudent) {
      console.log(this.selectedStudent);
      if (this.selectedStudent.status === 'out' || this.selectedStudent.status === undefined) {
        this.enterBtn = 'Sign in';
      } else {
        this.enterBtn = 'Sign out';
      }
    }
  }

  save() {
    if (this.selectedStudent.status === 'out' || this.selectedStudent.status === undefined) {
      this.timeTrackerService.saveStudentTime(this.selectedStudent);
      this.snackBar.open(`${this.selectedStudent.firstName} signed in.`, 'Welcome!', {
        duration: 5000, verticalPosition: 'top'
      });
    } else {
      this.timeTrackerService.updateStudentTime(this.selectedStudent);
      this.snackBar.open(`${this.selectedStudent.firstName} signed out.`, 'Bye!', {
        duration: 5000, verticalPosition: 'top'
      });
    }

    this.timeTrackerForm.reset();

  }

  onNotify(value: IStudent): void {
    this.selectedStudent = value;
    this.checkIfSignedIn();
  }

}
