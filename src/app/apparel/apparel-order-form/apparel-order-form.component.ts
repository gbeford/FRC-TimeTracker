import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../clothing.service';
import { IApparelImage } from 'app/model/apparel-image';
import { IApparel } from 'app/model/apparel';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// http://learningprogramming.net/mean-stack/angular-6/build-shopping-cart-in-angular-6/

@Component({
  selector: 'app-apparel-order-form',
  templateUrl: './apparel-order-form.component.html',
  styleUrls: ['./apparel-order-form.component.scss']
})
export class ApparelOrderFormComponent implements OnInit {

  sizes: string[];
  // imageData: IApparelImage;
  imageSrc: string;
  imageBase64: string;
  apparealData: IApparel[];
  public apparelForm: FormGroup;
  formObj: IApparel;
  imageId: number;


  constructor(private clothingService: ClothingService, private formBuilder: FormBuilder) { }

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

  save() {

    if (this.apparelForm.valid) {
      this.formObj = {
        apparelId: 0,
        quantity: null,
        item: this.apparelForm.value.itemCtrl,
        description: this.apparelForm.value.descCtrl,
        gender: null,
        size: null,
        price: this.apparelForm.value.priceCtrl,
        upCharge: this.apparelForm.value.upChargeCtrl ? this.apparelForm.value.upChargeCtrl : null,
        type: this.apparelForm.value.typeCtrl,
        apparelImageId: this.apparelForm.value.imageCtrl,
        nameCharge: this.apparelForm.value.nameChargeCtl ? this.apparelForm.value.nameChargeCtl : null,
        canHaveName: this.apparelForm.value.canHaveNameCtl ? this.apparelForm.value.canHaveNameCtl : 0,
      };
      this.clothingService.saveCartItem(
      // this.formObj).subscribe(res => {
      //   this.apparelForm.reset();
      //  });
   // }
  }





}
