import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../clothing.service';
import { IApparel } from 'app/model/apparel';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';

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

  constructor(private clothingService: ClothingService,
    private formBuilder: FormBuilder, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.getSizes();
    // this.getImageList();
    this.getAppareal();
    this.createForm();
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
    debugger;

    if (this.apparelForm.valid) {
      // this.formObj = {
      //   apparelId: 0,
      //   quantity: null,
      //   item: this.apparelForm.value.itemCtrl,
      //   description: this.apparelForm.value.descCtrl,
      //   gender: null,
      //   size: null,
      //   price: this.apparelForm.value.priceCtrl,
      //   upCharge: this.apparelForm.value.upChargeCtrl ? this.apparelForm.value.upChargeCtrl : null,
      //   type: this.apparelForm.value.typeCtrl,
      //   apparelImageId: this.apparelForm.value.imageCtrl,
      //   nameCharge: this.apparelForm.value.nameChargeCtl ? this.apparelForm.value.nameChargeCtl : null,
      //   canHaveName: this.apparelForm.value.canHaveNameCtl ? this.apparelForm.value.canHaveNameCtl : 0,
      // };
      // this.clothingService.saveCartItem(
      // this.formObj).subscribe(res => {
      //   this.apparelForm.reset();
      //  });
      this.shoppingCartService.addItem(apparel, this.apparelForm.value.quanityCtrl);
      console.log('item added ', apparel);
    }
  }



}
