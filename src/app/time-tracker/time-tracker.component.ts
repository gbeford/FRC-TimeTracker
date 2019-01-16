import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, tap, startWith, debounceTime } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import { StudentService } from '../student/student.service';
import { Student } from '../model/student';
import { TimeTrackerMsgComponent } from './time-tracker-msg-component';
import { IEvent } from 'app/model/event';

import { pipe } from 'rxjs';
import { EventsService } from 'app/events/events.service';



@Component({
  selector: 'app-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {
  title = 'Hours / Points Tracker';
  enterBtn = '';
  signedIn = false;
  in = '';
  students: Student[];
  selectedStudent: Student;
  eventList: Observable<IEvent[]>;
  public timeTrackerForm: FormGroup;
  filteredOptions: Observable<Student[]>;

  constructor(private formBuilder: FormBuilder,
    private timeTrackerService: StudentService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private eventService: EventsService) { }

  ngOnInit(): void {
    this.createForm();
    this.timeTrackerForm.controls['eventsCtrl'].setValue('1');
    this.getAllStudents();
    this.getEvents();
  }

  createForm() {
    this.timeTrackerForm = this.formBuilder.group({
      eventsCtrl: ['', [<any>Validators.required]]

    });
  }

  // get list of students for autoComplete
  getAllStudents() {
    this.timeTrackerService.getStudents().subscribe(s => {
      this.students = s;
      this.selectedStudent = null;
    });
  }

  // this function is using asyc pipe
  getEvents() {
    this.eventList = this.eventService.getEventsList();
  }

  checkIfSignedIn() {
    if (this.selectedStudent) {
      if (!this.selectedStudent.isSignedIn) {
        this.enterBtn = 'Sign in';
        this.timeTrackerForm.get('eventsCtrl').enable();
      } else {
        this.enterBtn = 'Sign out';
        this.timeTrackerForm.get('eventsCtrl').disable();
      }
    }
  }

  save() {
    // debugger;
    this.timeTrackerService.signIn_OutStudent(this.selectedStudent,
      this.timeTrackerForm.get('eventsCtrl').value).subscribe(res => { });
    {
      if (!this.selectedStudent.isSignedIn) {
        this.snackBar.open(`${this.selectedStudent.firstName} signed in.`, 'Welcome!', {
          duration: 5000, verticalPosition: 'top'
        });
      } else {
        this.snackBar.open(`${this.selectedStudent.firstName} signed out.`, 'Bye!', {
          duration: 5000, verticalPosition: 'top'
        });
      }

      if (this.selectedStudent.messages) {
        if (this.selectedStudent.messages.length > 0) {
          this.openDialog(this.selectedStudent);
        }
      }
      this.timeTrackerForm.reset();
      this.timeTrackerForm.controls['eventsCtrl'].setValue('1'); // reselect default value we want to show
      this.getAllStudents(); // reload the student list
    }
  }

  // autoComplete
  onNotify(value: Student): void {
    this.selectedStudent = value;
    this.checkIfSignedIn();
  }

  // modal
  openDialog(student): void {
    const dialogRef = this.dialog.open(TimeTrackerMsgComponent, {
      width: '500px',

      // get student messages
      data: { student: student }
    });
  }


}
