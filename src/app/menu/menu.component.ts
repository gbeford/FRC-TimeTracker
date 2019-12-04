import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student/student.service';
import { SecurityService } from 'app/security/security.service';
import { AppUserAuth } from 'app/security/app-user-auth';
import { ShoppingCartService } from 'app/apparel/shopping-cart.service';
import { ShoppingCart } from 'app/apparel/shopping-cart-model';


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
    private cartService: ShoppingCartService) {
    this.securityObject = securityService.securityObject;
  }

  ngOnInit() {

    this.cartService.cart.subscribe(c => {
      debugger;
      console.log('c', c.items);
      if (c.items !== undefined) {
        this.cartSize = c.items.length;
      }

    });

    // console.log('count', this.getItems());

    // countOfStudentsLogin() {
    //   this.svc.totalStudentsLogin().subscribe(s => this.signedInStudents = s.length);
    // }
  }


  // getItems() {
  //   this.shoppingCartItems = this.cartService.retrieveShoppingCart();
  //   // used if the page gets refreshed
  //   if (this.shoppingCartItems !== null) {
  //     this.cartSize = this.shoppingCartItems.items.length;
  //   }
  // }


  logout(): void {
    this.securityService.logout();
  }
}
