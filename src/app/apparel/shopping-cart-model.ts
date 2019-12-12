import { CartItem } from './cart-Item';

/* Defines the cart entity */
export class ShoppingCart {
    studentID: number;
    items: CartItem[];
    grossTotal = 0;
    itemsTotal: number;

    constructor() {
        this.items = [];
    }
}
