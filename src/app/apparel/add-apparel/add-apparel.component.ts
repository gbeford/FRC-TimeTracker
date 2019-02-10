import { Component, OnInit} from '@angular/core';
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
  sizeList = [];

  constructor(private formBuilder: FormBuilder, private apparelService: ClothingService) { }

  ngOnInit() {
    this.sizeList = this.apparelService.getClothingSize();
    console.log('Size list', this.sizeList);
    this.createForm();
  }

  uploadNotify() {
    alert('image was selected');
  }

  createForm() {
    this.apparelForm = this.formBuilder.group({
      itemCtrl: ['', [<any>Validators.required]],
      descCtrl: ['', [<any>Validators.required]],
      genderCtrl: ['', [<any>Validators.required]],
      typeCtrl: ['', [<any>Validators.required]],
      sizeCtrl: ['', [<any>Validators.required]],
      priceCtrl: ['', [<any>Validators.required]],

    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.apparelForm.controls; }

  save() {
    this.submitted = true;
debugger
    if (this.apparelForm.valid) {
      this.formObj = {
        apparelId: null,
        quantity: null,
        item: this.apparelForm.value.itemCtrl,
        description: this.apparelForm.value.descCtrl,
        gender: this.apparelForm.value.genderCtrl,
        price: this.apparelForm.value.priceCtrl,
        size: this.apparelForm.value.sizeCtrl,
        type: this.apparelForm.value.typeCtrl
      };
      this.apparelService.saveApparelItem(
        this.formObj).subscribe(res => {
          this.apparelForm.reset();
        });
    }
  }


}
