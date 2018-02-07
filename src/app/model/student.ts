
/* Defines the student entity */
export interface IStudent {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    grade: number;
    status?: string;
    checkInTime?: Date;
    messages: string[];
}
