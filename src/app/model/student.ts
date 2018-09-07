
/* Defines the student entity */
export class Student {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    grade: number;
    updated?: Date;
    created?: Date;
    isSignedIn: boolean;
    messages: string[];

    public get status() {
        return this.isSignedIn ? 'Signed In' : 'Signed Out';
    }

}


