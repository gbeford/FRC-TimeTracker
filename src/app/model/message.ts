import { Student } from './student';

/* Defines the student entity */
export interface IMessage {
    messageId: number;
    messageText: string;
    sortOrder: number;
    show: boolean
}
