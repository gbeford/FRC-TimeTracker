import { Student } from './student';

/* Defines the student entity */
export interface IMessage {
    messageID: number;
    messageText: string;
    sortOrder: number;
    show: boolean;
}
