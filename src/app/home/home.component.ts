import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../shared/auth.service';

import { User } from '../shared/user';
import { StudentService } from '../forms/time-tracker/student.service';
import { MessageService } from '../forms/message/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  signedInStudent: number;

  user: User;

  constructor(private svc: StudentService, private snackBar: MatSnackBar,
    private auth: AuthService, private messageService: MessageService) { }

  ngOnInit() {
    // this.auth.user$.subscribe(
    //   (user) => this.user = user);
    // this.countOfStudentsLogin();
    this.messageService.getMessageList().subscribe(m => {
      console.log('messages', m);
    });
  }

  // loginWithGoogle() {
  //   this.auth.googleLogin();
  // }

  canAdmin() {
    return this.auth.canAdmin(this.user);
  }

  // logOut() {
  //   this.auth.signOut();
  // }

  logOutStudents() {
    this.svc.logOutStudents();
    this.snackBar.open('All signed in students have been signed out.', 'Okay', {
      duration: 5000, verticalPosition: 'top'
    });
    // msend email
  }

  // countOfStudentsLogin() {
  //   this.svc.totalStudentsLogin().subscribe(s => this.signedInStudent = s.length);
  // }

}
