import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: User;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe(
      (user) => this.user = user);
  }

  loggedIn() {
    return this.auth.canEdit(this.user);
  }

  isAdmin() {
    return this.auth.canAdmin(this.user);
  }
}
