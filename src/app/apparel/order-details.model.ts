export interface IOrderDetails {
  orderNumber: number;
  studentName: string;
  item: string;
  grossTotal: number;
  paid: boolean;
  price: number;
  size?: string;
  quantity: number;
  nameOnSleeve: boolean;
  nameCharge: number;
  sleeveName?: string;
  upCharge: number;
}
