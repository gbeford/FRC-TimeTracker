import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../clothing.service';
import { IApparel } from 'app/apparel/apparel-model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { CartItem } from 'app/model/cart-Item';

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

  constructor(private clothingService: ClothingService,
    private formBuilder: FormBuilder,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.getSizes();
    // this.getImageList();
    this.getAppareal();
    this.createForm();
    this.getCartNumber();
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
      // imageCtrl: [''],
      nameChargeCtl: [''],
      canHaveNameCtl: [''],
      genderCtrl: ['', [<any>Validators.required]],
      quantityCtrl: [<any>Validators.required],
      sizeCtrl: [<any>Validators.required],
      sleeveNameCtrl: [''],
    });
  }

  public addItemToCart(apparel: IApparel) {
    if (this.apparelForm.valid) {
      this.item = new CartItem();
      this.item.apparel = apparel;
      this.item.upCharge = this.apparelForm.value.upChargeCtrl ? this.apparelForm.value.upChargeCtrl : null;
      this.item.nameCharge = this.apparelForm.value.nameChargeCtl ? this.apparelForm.value.nameChargeCtl : null;
      this.item.gender = this.apparelForm.value.genderCtrl;
      this.item.size = this.apparelForm.value.sizeCtrl;
      this.item.quantity = this.apparelForm.value.quantityCtrl;
      this.item.sleeveName = this.apparelForm.value.sleeveNameCtrl;
      this.shoppingCartService.addItem(this.item);

      this.showBox = true;

      console.log('item added ', this.item);
    }
    this.apparelForm.reset();
  }

  getCartNumber() {
    this.shoppingCartService.itemCount.subscribe(c => {
      this.cartSize = c;
    });

    this.shoppingCartService.tempShoppingCart
      .subscribe(s => {
        if (s.apparel !== undefined) {
          this.itemsSelectedTotal = s.totalItemAddedToCartCharge;
          this.itemsSelected = s.apparel.item;
          this.itemQuanitySelected = s.quantity;
        }
        console.log('s', s);
      });
  }




}
