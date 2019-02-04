import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../clothing.service';

@Component({
  selector: 'app-apparel-order-form',
  templateUrl: './apparel-order-form.component.html',
  styleUrls: ['./apparel-order-form.component.scss']
})
export class ApparelOrderFormComponent implements OnInit {

sizes: string[];

  constructor(private clothingService: ClothingService ) { }

  ngOnInit() {
    this.getSizes();
  }

  getSizes() {

   this.sizes =  this.clothingService.getClothingSize();
  }

}
