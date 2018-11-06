
/* Defines the student entity */
export class Student {
    id: string;
    studentId: number;
    firstName: string;
    lastName: string;
    email: string;
    grade: number;
    updated?: Date;
    created?: Date;
    signInTime?: Date;
    isSignedIn: boolean;
    messages: string[];
    eventID: number;
}


