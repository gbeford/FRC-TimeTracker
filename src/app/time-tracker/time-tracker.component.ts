import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, tap, startWith, debounceTime } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import { StudentService } from '../student/student.service';
import { Student } from '../model/student';
import { TimeTrackerMsgComponent } from './time-tracker-msg-component';
import { IEvent } from 'app/model/event';
import { EventsService } from 'app/services/events.service';


@Component({
  selector: 'app-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css']
})
export class TimeTrackerComponent implements OnInit {
  title = 'Hours / Points Tracker';
  enterBtn = '';
  in = '';
  students: Student[];
  selectedStudent: Student;
  eventList: IEvent[];
  public timeTrackerForm: FormGroup;
  filteredOptions: Observable<Student[]>;

  constructor(private formBuilder: FormBuilder,
    private timeTrackerService: StudentService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private eventService: EventsService) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllStudents();
    this.getEvents();
  }

  createForm() {
    console.log('here');
    this.timeTrackerForm = this.formBuilder.group({
      events: [''],
    });
  }

  // get list of students for autoComplete
  getAllStudents() {
    this.timeTrackerService.getStudents().subscribe(s => {
      this.students = s;
    });
  }

  // get list of messages
  getEvents() {
    this.eventService.getMEventsList().subscribe(s => {
      this.eventList = s;
      console.log('events ', this.eventList);
    });
  }

  checkIfSignedIn() {
    if (this.selectedStudent) {
      console.log(this.selectedStudent);
      if (!this.selectedStudent.isSignedIn) {
        this.enterBtn = 'Sign in';
      } else {
        this.enterBtn = 'Sign out';
      }
    }
  }

  save() {
    this.timeTrackerService.signIn_OutStudent(this.selectedStudent).subscribe(res => { });
    if (!this.selectedStudent.isSignedIn) {
      this.snackBar.open(`${this.selectedStudent.firstName} signed in.`, 'Welcome!', {
        duration: 5000, verticalPosition: 'top'
      });
    } else {
      this.snackBar.open(`${this.selectedStudent.firstName} signed out.`, 'Bye!', {
        duration: 5000, verticalPosition: 'top'
      });
    }

    console.log('student message ', this.selectedStudent);
    if (this.selectedStudent.messages && this.selectedStudent.messages.length > 0) {

      this.openDialog(this.selectedStudent);
    }
    this.timeTrackerForm.reset();
  }

  // autoComplete
  onNotify(value: Student): void {
    this.selectedStudent = value;
    console.log('auto from time compoent ', value);
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
