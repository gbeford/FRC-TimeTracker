import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student/student.service';
import { SecurityService } from 'app/security/security.service';
import { AppUserAuth } from 'app/security/app-user-auth';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  signedInStudents = 0;
  securityObject: AppUserAuth = null;
  constructor(private svc: StudentService, private securityService: SecurityService) { }

  ngOnInit() {

    // countOfStudentsLogin() {
    //   this.svc.totalStudentsLogin().subscribe(s => this.signedInStudents = s.length);
    // }
  }

  logout(): void {
    this.securityService.logout();
  }
}
