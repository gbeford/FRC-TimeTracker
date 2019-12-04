import { BPClient } from 'blocking-proxy';
import { IApparel } from '../apparel/apparel-model';

/* Defines the cart item entity */
export class CartItem {
    apparel: IApparel;
    // apparelID: number;
    totalItemPrice: number;
    upCharge: number;
    nameCharge: number;
    gender?: string;
    size: string;
    quantity: number;
    sleeveName: string;  // this is for the name on the arm
    totalItemAddedToCartCharge?: number; // this the total of the item added to the cart
    // itemsSelected?: []; // this is for the items added to the cart
}
