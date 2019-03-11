import { CartItem } from './cart-Item';

/* Defines the cart entity */
export class ShoppingCart {
    studentID: number;
    items: CartItem[];
    grossTotal: number;
    itemsTotal: number;


    public updateFrom(src: ShoppingCart) {
        this.items = src.items;
        this.grossTotal = src.grossTotal;
        this.itemsTotal = src.itemsTotal;
    }
}