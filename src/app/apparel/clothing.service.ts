import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClothingService {

  size: string[];

  constructor() { }

  getClothingSize() {
    this.size = ['S', 'M', 'L', 'XL'];
    return this.size;
  }
}
