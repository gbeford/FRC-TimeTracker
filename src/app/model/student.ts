
/* Defines the student entity */
export interface IStudent {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    grade: number;
    updated?: Date;
    created?: Date;
    signedIn?: Date;
    messages: string[];
}
