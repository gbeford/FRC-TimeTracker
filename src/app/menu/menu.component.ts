import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';
import { TimeTrackerService } from '../forms/time-tracker/time-tracker.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  signedInStudents = 0;
  user: User;

  constructor(private auth: AuthService, private svc: TimeTrackerService) { }

  ngOnInit() {
    this.auth.user$.subscribe(
      (user) => this.user = user);
    // this.countOfStudentsLogin();
  }
  // log in to the application
  loginWithGoogle() {
    this.auth.googleLogin();
  }
  logOut() {
    this.auth.signOut();
  }

  // permissons to the pages
  loggedIn() {
    return this.auth.canEdit(this.user);
  }

  isAdmin() {
    return this.auth.canAdmin(this.user);
  }

  // countOfStudentsLogin() {
  //   this.svc.totalStudentsLogin().subscribe(s => this.signedInStudents = s.length);
  // }
}
