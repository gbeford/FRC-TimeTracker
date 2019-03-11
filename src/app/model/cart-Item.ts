import { BPClient } from 'blocking-proxy';
import { IApparel } from './apparel';

/* Defines the cart item entity */
export class CartItem {
    // apparel: IApparel;
    apparelID: number;
    upCharge: number;
    nameCharge: number;
    gender: string;
    size: string;
    quantity: number;
    sleeveName: string;  // this is for the name on the arm
}
