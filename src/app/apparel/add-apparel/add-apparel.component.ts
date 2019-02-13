import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClothingService } from '../clothing.service';
import { IApparel } from 'app/model/apparel';

@Component({
  selector: 'app-add-apparel',
  templateUrl: './add-apparel.component.html',
  styleUrls: ['./add-apparel.component.scss']
})
export class AddApparelComponent implements OnInit {

  public apparelForm: FormGroup;
  public submitted: boolean;
  item: {};
  formObj: IApparel;
  // sizeList = [];
  imageList = [];

  constructor(private formBuilder: FormBuilder, private apparelService: ClothingService) { }

  ngOnInit() {
    // this.sizeList = this.apparelService.getClothingSize();
    this.getImageText();
    this.createForm();
  }


  createForm() {
    this.apparelForm = this.formBuilder.group({
      itemCtrl: ['', [<any>Validators.required]],
      descCtrl: ['', [<any>Validators.required]],
      typeCtrl: ['', [<any>Validators.required]],
      upChargeCtrl: [''],
      priceCtrl: ['', [<any>Validators.required]],
      imageCtrl: ['', [<any>Validators.required]],
      nameChargeCtl: [''],
      // genderCtrl: ['', [<any>Validators.required]],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.apparelForm.controls; }

  save() {
    this.submitted = true;
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
      };
      this.apparelService.saveApparelItem(
        this.formObj).subscribe(res => {
          this.apparelForm.reset();
        });
    }
  }

  getImageText() {
    // debugger
    this.apparelService.getImageNames().subscribe(data => {
      this.imageList = data;
      console.log(data);
    });
  }

}
