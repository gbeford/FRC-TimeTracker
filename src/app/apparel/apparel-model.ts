/* Defines the apparel entity */
export interface IApparel {
    apparelId: number;
    apparelImageId: number;
    item: string;
    description: string;
    gender?: string;
    price: number;
    size: string;
    type: string;
    quantity: number;
    upCharge: number;
    nameCharge: number;
    canHaveName: boolean;
    filename: string;
    image: any;
    contentType: string;
    showGender?: boolean;
    showSize: boolean;
    showItem: boolean;
    showXS?: boolean;
    showYXL?: boolean;
}
