import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'app/message/message.service';
import { StudentService } from '../student/student.service';
import { AppUserAuth } from 'app/security/app-user-auth';
import { SecurityService } from 'app/security/security.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  signedInStudent: number;
  securityObject: AppUserAuth = null;

  constructor(private studentService: StudentService, private snackBar: MatSnackBar,
    private securityService: SecurityService, private messageService: MessageService) {
    this.securityObject = securityService.securityObject;
  }

  ngOnInit() {

  }

  logOutAllStudents() {
    this.studentService.logOutStudents().subscribe(s => {
      alert(' All Students are logged out.');
    });
  }

  countOfStudentsLogin() {
    // this.svstudentServicec.totalStudentsLogin().subscribe(s => this.signedInStudent = s.length);
  }

}
