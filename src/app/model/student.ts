
/* Defines the student entity */
export class Student {
    Id: number;
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

}


