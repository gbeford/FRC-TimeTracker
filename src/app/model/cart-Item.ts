import { BPClient } from 'blocking-proxy';

/* Defines the cart itevm entity */
export interface ICartItem {
    apparelID: number;
    item: string;
    description: string;
    price: number;
    gender: string;
    size: string;
    type: string;
    quantity: number;
    displayName: boolean;
}
