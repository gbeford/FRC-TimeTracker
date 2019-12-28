import { CartItem } from './cart-Item';

export interface IOrder {
    orderId: number;
    studentId: number;
    studentName: string;
    orderDate: Date;
    items: CartItem[];
   // itemsTotal: number;
    grossTotal: number;
    paid?: boolean;
}