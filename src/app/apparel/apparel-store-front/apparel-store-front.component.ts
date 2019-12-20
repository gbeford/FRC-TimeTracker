import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../clothing.service';
import { IApparel } from 'app/apparel/apparel-model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { CartItem } from 'app/apparel/cart-Item';
import { Student } from 'app/model/student';
import { ShoppingCart } from '../shopping-cart-model';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

// http://learningprogramming.net/mean-stack/angular-6/build-shopping-cart-in-angular-6/

@Component({
  selector: 'app-apparel-store-front',
  templateUrl: './apparel-store-front.component.html',
  styleUrls: ['./apparel-store-front.component.scss']
})
export class ApparelStoreFrontComponent implements OnInit {

  sizes: string[];
  // imageData: IApparelImage;
  imageSrc: string;
  imageBase64: string;
  apparealData: IApparel[];
  public apparelForm: FormGroup;
  formObj: IApparel;
  imageId: number;
  public apparel: Observable<IApparel[]>;
  item: CartItem;
  cartSize = 0;
  itemsSelected: string;
  itemsSelectedTotal = 0;
  itemQuanitySelected = 0;
  showBox = false;
  submitted = false;
  hasError = false;
  shoppingCart: ShoppingCart;
  pickStudent: boolean;
  student: string;

  constructor(private clothingService: ClothingService,
    private formBuilder: FormBuilder,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.getSizes();
    // this.getImageList();
    this.getAppareal();
    this.createForm();
    this.getCartDetails();
    this.getCart();
  }

  getSizes() {
    this.sizes = this.clothingService.getClothingSize();
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
    });
  }


  createForm() {
    this.apparelForm = this.formBuilder.group({
      itemCtrl: [''],
      descCtrl: [''],
      typeCtrl: [''],
      upChargeCtrl: [''],
      priceCtrl: [''],
      nameChargeCtl: [''],
      canHaveNameCtl: [''],
      genderCtrl: ['', Validators.required],
      quantityCtrl: ['', Validators.required],
      size: ['', Validators.required],
      sleeveNameCtrl: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.apparelForm.controls; }


  public addItemToCart(apparel: IApparel) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.apparelForm.invalid) {
      return;
    }

    // validate if checkbox for name is selected that a name is in the name input
    if (this.apparelForm.value.canHaveNameCtl === true &&
      (this.apparelForm.value.sleeveNameCtrl === null || this.apparelForm.value.sleeveNameCtrl === '')) {
      this.hasError = true;
      return this.apparelForm.invalid === false;

    }

    // add apparel item to model
    this.item = new CartItem();
    this.item.apparel = apparel;
    this.item.upCharge = this.apparelForm.value.upChargeCtrl ? this.apparelForm.value.upChargeCtrl : null;
    this.item.nameCharge = this.apparelForm.value.nameChargeCtl ? this.apparelForm.value.nameChargeCtl : null;
    this.item.gender = this.apparelForm.value.genderCtrl;
    this.item.size = this.apparelForm.value.size;
    this.item.quantity = this.apparelForm.value.quantityCtrl;
    this.item.sleeveName = this.apparelForm.value.sleeveNameCtrl;
    this.item.nameOnSleeve = this.apparelForm.value.canHaveNameCtl;

    this.shoppingCartService.addItem(this.item);

    this.showBox = true;
    this.apparelForm.reset();
    this.submitted = false;
  }


  // get last item added to the cart, (subscribe to behavior subject)
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
