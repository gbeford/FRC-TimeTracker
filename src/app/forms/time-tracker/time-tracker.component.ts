import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, tap, startWith, debounceTime } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import { StudentService } from './student.service';
import { IStudent } from '../../model/student';
import { TimeTrackerModalComponent } from './time-tracker-modal.component';


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
    private timeTrackerService: StudentService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

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
  onNotify(value: IStudent): void {
    this.selectedStudent = value;
    console.log('auto from time compoent ', value);
    this.checkIfSignedIn();
  }

  // modal
  openDialog(student): void {
    const dialogRef = this.dialog.open(TimeTrackerModalComponent, {
      width: '500px',

      // get student messages
      data: { messages: student }
    });
  }


}
