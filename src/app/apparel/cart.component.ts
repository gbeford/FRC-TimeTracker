import { Component, OnInit } from '@angular/core';
import { ICartItem } from 'app/model/cart-Item';
import { ActivatedRoute } from '@angular/router';
import { ClothingService } from './clothing.service';

// http://learningprogramming.net/mean-stack/angular-6/build-shopping-cart-in-angular-6/

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: ICartItem[] = [];
  total: number;

  constructor(private activatedRoute: ActivatedRoute,
    private clothingService: ClothingService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        const item: ICartItem = {
          apparel: this.clothingService.getApparelItem(id).subscribe(data => {
            console.log('cart ', data);
          },
            quantity: 1
        };
        if (localStorage.getItem('cart') == null) {
          const cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          const cart: any = JSON.parse(localStorage.getItem('cart'));
          let index: -1;
          for (let i = 0; i < cart.length; i++) {
            const item: ICartItem = JSON.parse(cart[i]);
            if (item.apparel.apparelId === id) {
              index = i;
              break;
            }
          }
          if (index === -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            const item: ICartItem = JSON.parse(cart[index]);
            item.quantity += 1;
            cart[index] = JSON.stringify(item);
            localStorage.setItem('cart', JSON.stringify(cart));
          }
        }
        this.loadCart();
      } else {
        this.loadCart();
      }
    });
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    const cart = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cart.length; i++) {
      const item = JSON.parse(cart[i]);
      this.items.push({
        apparel: item.apparel,
        quantity: item.quantity
      });
      this.total += (item.product.price * item.quantity) + item.nameCharge + item.upCharge;
    }
  }

  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: -1;
    for (var i = 0; i < cart.length; i++) {
      let item: ICartItem = JSON.parse(cart[i]);
      if (item.apparel.apparelId === id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }


}
