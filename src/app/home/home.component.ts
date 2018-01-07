import { Component, OnInit } from '@angular/core';
import { TimeTrackerService } from '../time-tracker/time-tracker.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../shared/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signedInStudent: number;

  user: firebase.User = null;

  constructor(private svc: TimeTrackerService, private snackBar: MatSnackBar,
    private auth: AuthService) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
    this.countOfStudentsLogin();
  }

  getStudentLoginCount() {

  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  authenticated() {
    const ok = this.user != null && this.user.email.indexOf('shrewsburyrobotics.org') > -1;
    return ok;
   }

  logOut() {
    this.auth.logOut();
  }

  logOutStudents() {
    this.svc.logOutStudents(new Date());
    this.snackBar.open('All signed in students have been signed out.', 'Okay', {
      duration: 5000, verticalPosition: 'top'
    });
    // msend email
  }

  countOfStudentsLogin() {
    this.svc.totalStudentsLogin().subscribe(s => this.signedInStudent = s.length);
  }

}
