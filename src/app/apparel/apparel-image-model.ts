import { BinaryData } from 'fs';
import * as fs from 'fs';
import { Binary } from '@angular/compiler';

/* Defines the apparel entity */
export interface IApparelImage {

    apparelImageId: number;
    filename: string;
    imageName: string;
    image: BinaryData;
    contentType: string;
}
