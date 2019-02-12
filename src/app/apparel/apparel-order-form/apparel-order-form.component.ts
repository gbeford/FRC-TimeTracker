import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../clothing.service';
import { IApparelImage } from 'app/model/apparel-image';

@Component({
  selector: 'app-apparel-order-form',
  templateUrl: './apparel-order-form.component.html',
  styleUrls: ['./apparel-order-form.component.scss']
})
export class ApparelOrderFormComponent implements OnInit {

sizes: string[];
  imageData: IApparelImage;

  constructor(private clothingService: ClothingService ) { }

  ngOnInit() {
    this.getSizes();
    this.getImageList();
  }

  getSizes() {
   this.sizes =  this.clothingService.getClothingSize();
  }

  getImageList() {
    this.clothingService.getImages().subscribe(data => {
      this.imageData = data[0];
      console.log(data);
    });
  }

}
