import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClothingService } from '../clothing.service';
import { IApparel } from 'app/apparel/apparel-model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ShoppingCartService } from '../shopping-cart.service';
import { CartItem } from 'app/apparel/cart-Item';
import { Student } from 'app/model/student';
import { ShoppingCart } from '../shopping-cart-model';

@Component({
  selector: 'app-apparel-store-front',
  templateUrl: './apparel-store-front.component.html',
  styleUrls: ['./apparel-store-front.component.scss']
})
export class ApparelStoreFrontComponent implements OnInit {

  @ViewChild('addedToCart', { static: false }) addedToCartLink: ElementRef;

  studentRequired: string;
  showError = false;
  // imageData: IApparelImage;
  // imageSrc: string;
  // imageBase64: string;
  apparealData: IApparel[];
  public form: FormGroup;
  itemsSelected: string;
  itemsSelectedTotal = 0;
  itemQuanitySelected = 0;
  showBox = false;
  shoppingCart: ShoppingCart;
  pickStudent: boolean;
  student: string;
  hasStudent = false;

  constructor(private clothingService: ClothingService,
    private formBuilder: FormBuilder,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.getAppareal();
    this.createForm();
    this.getCartDetails();
    this.getCart();
  }

  // getImageList() {
  //   this.clothingService.getImages().subscribe(data => {
  //     this.imageData = data[0];
  //     this.imageSrc = 'data:' + this.imageData.contentType + ';base64,' + this.imageData.image;
  //     console.log('Image', data);
  //   });
  // }

  // getImageListById(imageId) {
  //   this.clothingService.getImagesById(imageId).subscribe(data => {
  //     this.imageData = data[0];
  //     this.imageSrc = 'data:' + this.imageData.contentType + ';base64,' + this.imageData.image;
  //     console.log('Image', data);
  //   });
  // }


  getAppareal() {
    this.clothingService.getApparelList().subscribe(data => {
      this.apparealData = data;
      // console.log('apparel', this.apparealData);
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
    });
  }

  public addItemToCart(value: CartItem) {
    if (this.hasStudent || this.student) {
      this.showError = false;
      this.shoppingCartService.addItem(value);
      this.showBox = true;
      // to scroll to the item added to cart box
      this.addedToCartLink.nativeElement.scrollIntoView({ block: 'start', inline: 'start' });
    } else {
      this.showError = true;
      this.studentRequired = 'Please select a student';
    }
  }

  // gets last item added to the cart, (subscribe to behavior subject)
  getCartDetails() {
    this.shoppingCartService.tempShoppingCartItem
      .subscribe(s => {
        if (s.apparel !== undefined) {
          this.itemsSelectedTotal = s.totalItemAddedToCartCharge;
          this.itemsSelected = s.apparel.item;
          this.itemQuanitySelected = s.quantity;
        }
      });
  }

  // autoComplete to get students name and id
  onNotify(value: Student): void {
    console.log('student', value);
    if (value) {
      this.hasStudent = true;
    }
    // set student info to session
    this.shoppingCartService.AddStudentIdToCart(value);
  }

  // pull student info from behavior subject
  getCart() {
    this.shoppingCartService.cart.subscribe(c => {
      this.student = c.studentName;

      if (c.studentID) {
        this.pickStudent = true;
      } else {
        this.pickStudent = false;
      }
    });
  }


}
