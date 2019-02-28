import { ICartItem } from './cart-Item';

/* Defines the cart entity */
export interface IShoppingCart {
    studentID: number;
    items: ICartItem[];
    grossTotal: number;
    itemsTotal: number;
}



