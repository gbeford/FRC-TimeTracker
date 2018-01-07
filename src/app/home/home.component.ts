import { Component, OnInit } from '@angular/core';
import { TimeTrackerService } from '../time-tracker/time-tracker.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private svc: TimeTrackerService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  getStudentLoginCount() {

  }

  logOutStudents() {
    this.svc.logOutStudents(new Date());
    this.snackBar.open('All signed in students have been signed out.', 'Okay', {
      duration: 5000, verticalPosition: 'top'
    });
    // msend email
  }

}
