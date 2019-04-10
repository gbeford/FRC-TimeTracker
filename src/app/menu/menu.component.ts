import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student/student.service';
import { SecurityService } from 'app/security/security.service';
import { AppUserAuth } from 'app/security/app-user-auth';
import { ShoppingCartService } from 'app/apparel/apparel-store-front/shopping-cart.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  signedInStudents = 0;
  securityObject: AppUserAuth = null;
  cartSize = 0;
  constructor(private svc: StudentService, private securityService: SecurityService, private cartService: ShoppingCartService) {
    this.securityObject = securityService.securityObject;
  }

  ngOnInit() {
    this.cartService.itemCount.subscribe(c => {
      this.cartSize = c;
    });

    // countOfStudentsLogin() {
    //   this.svc.totalStudentsLogin().subscribe(s => this.signedInStudents = s.length);
    // }
  }

  logout(): void {
    this.securityService.logout();
  }
}
