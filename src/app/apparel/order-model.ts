import { CartItem } from './cart-Item';

export interface IOrder {
    orderId: number;
    studentId: number;
    studentName: string;
    orderDate: Date;
    items: CartItem[];
    itemsTotaltal: number;
    grossTotal: number;
}