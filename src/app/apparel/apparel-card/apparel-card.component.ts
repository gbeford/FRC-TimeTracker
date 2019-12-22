import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IApparel } from '../apparel-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShoppingCart } from '../shopping-cart-model';
import { CartItem } from '../cart-Item';
import { Observable } from 'rxjs';
import { ClothingService } from '../clothing.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Student } from 'app/model/student';

@Component({
  selector: 'app-apparel-card',
  templateUrl: './apparel-card.component.html',
  styleUrls: ['./apparel-card.component.scss']
})
export class ApparelCardComponent implements OnInit {

  @Input() public apparelItem: IApparel;
  @Output() addCartItem: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  sizes: string[];
  // imageData: IApparelImage;
  imageSrc: string;
  imageBase64: string;
  apparealData: IApparel[];
  public apparelForm: FormGroup;
  formObj: IApparel;
  imageId: number;
  // public apparel: Observable<IApparel[]>;

  cartSize = 0;
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
    this.createForm();
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

  getSizes() {
    this.sizes = this.clothingService.getClothingSize();
    console.log('sizes', this.sizes);
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
    const item = new CartItem();
    item.apparel = apparel;
    item.upCharge = this.apparelForm.value.upChargeCtrl ? this.apparelForm.value.upChargeCtrl : null;
    item.nameCharge = this.apparelForm.value.nameChargeCtl ? this.apparelForm.value.nameChargeCtl : null;
    item.gender = this.apparelForm.value.genderCtrl;
    item.size = this.apparelForm.value.size;
    item.quantity = this.apparelForm.value.quantityCtrl;
    item.sleeveName = this.apparelForm.value.sleeveNameCtrl;
    item.nameOnSleeve = this.apparelForm.value.canHaveNameCtl;

    this.addCartItem.emit(item);

    this.apparelForm.reset();
    this.submitted = false;

  }


  // // get last item added to the cart, (subscribe to behavior subject)
  // getCartDetails() {
  //   this.shoppingCartService.tempShoppingCartItem
  //     .subscribe(s => {
  //       if (s.apparel !== undefined) {
  //         this.itemsSelectedTotal = s.totalItemAddedToCartCharge;
  //         this.itemsSelected = s.apparel.item;
  //         this.itemQuanitySelected = s.quantity;
  //       }
  //     });
  // }




}
