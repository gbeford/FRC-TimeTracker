import { Component, OnInit } from '@angular/core';
import { TimeTrackerService } from '../time-tracker/time-tracker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signedInStudent: number;

  constructor(private svc: TimeTrackerService) { }

  ngOnInit() {
    this.countOfStudentsLogin();
  }

  getStudentLoginCount() {

  }

  logOutStudents() {
    this.svc.logOutStudents(new Date());

    // msend email
  }

  countOfStudentsLogin() {
    this.svc.totalStudentsLogin().subscribe(s => this.signedInStudent = s.length);
  }

}
