import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  filename: string;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private formBuilder: FormBuilder, private apparelService: ClothingService) { }

  ngOnInit() {
    // this.sizeList = this.apparelService.getClothingSize();
    // this.getImageText();
    this.createForm();
  }


  createForm() {
    this.apparelForm = this.formBuilder.group({
      itemCtrl: ['', [<any>Validators.required]],
      descCtrl: ['', [<any>Validators.required]],
      typeCtrl: ['', [<any>Validators.required]],
      upChargeCtrl: [''],
      priceCtrl: ['', [<any>Validators.required]],
      imageCtrl: null,
      nameChargeCtl: [''],
      canHaveNameCtl: [''],
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
        apparelImageId: 0,
        nameCharge: this.apparelForm.value.nameChargeCtl ? this.apparelForm.value.nameChargeCtl : null,
        canHaveName: this.apparelForm.value.canHaveNameCtl ? this.apparelForm.value.canHaveNameCtl : 0,
        filename: this.apparelForm.value.imageCtrl.filename,
        contentType: this.apparelForm.value.imageCtrl.contentType,
        image: this.apparelForm.value.imageCtrl.value
      };
      this.apparelService.saveApparelItem(
        this.formObj).subscribe(res => {
          this.apparelForm.get('imageCtrl').setValue(null);
          this.fileInput.nativeElement.value = '';
          this.filename = '';
          this.apparelForm.reset();
        });
    }
  }


  processFile(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.apparelForm.get('imageCtrl').setValue({
          filename: file.name,
          contentType: file.type,
          value: reader.result
        });
      };
      this.filename = file.name;
    }
  }


  // getImageText() {
  //   // debugger
  //   this.apparelService.getImageNames().subscribe(data => {
  //     this.imageList = data;
  //     console.log(data);
  //   });
  // }

}
