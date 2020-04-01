import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student/student.service';
import { SecurityService } from 'app/security/security.service';
import { AppUserAuth } from 'app/security/app-user-auth';
import { ShoppingCartService } from 'app/apparel/shopping-cart.service';
import { ShoppingCart } from 'app/apparel/shopping-cart-model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  signedInStudents = 0;
  securityObject: AppUserAuth = null;
  cartSize = 0;
  shoppingCartItems: ShoppingCart;


  constructor(private svc: StudentService, private securityService: SecurityService,
    private cartService: ShoppingCartService, private router: Router) {
    this.securityObject = securityService.securityObject;
  }

  ngOnInit() {

    this.cartService.cart.subscribe(c => {
        if (c.items !== undefined) {
        this.cartSize = c.items.length;
      } else {
        this.cartSize = 0;
      }

    });


    // countOfStudentsLogin() {
    //   this.svc.totalStudentsLogin().subscribe(s => this.signedInStudents = s.length);
    // }
  }


  logout(): void {
    this.securityService.logout();
    this.router.navigateByUrl('/');
  }
}
