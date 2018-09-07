
/* Defines the student entity */
export interface IStudent {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    grade: number;
    updated?: Date;
    created?: Date;
    isSignedIn: boolean;
    messages: string[];
}
