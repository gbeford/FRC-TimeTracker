import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MessageService } from 'app/message/message.service';
import { StudentService } from '../student/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  signedInStudent: number;

  constructor(private studentService: StudentService, private snackBar: MatSnackBar,
    private messageService: MessageService) { }

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
