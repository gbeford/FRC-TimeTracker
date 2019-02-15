import { BPClient } from 'blocking-proxy';

/* Defines the cart item entity */
export interface ICartItem {
    apparelID: number;
    upCharge: number;
    nameCharge: number;
    gender: string;
    size: string;
    quantity: number;
    sleeveName: string;  // this is for the name on the arm
}
