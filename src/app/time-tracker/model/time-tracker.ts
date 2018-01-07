

/* Defines the time tracker entity */
export interface ITimeTracker {
    studentId: string;
    createDate: string;
    createDateTime: Date;
    inTime: Date;
    outTime?: Date;
    totalHrs?: number;
    points?: number;
    adminSignedOut?: boolean;
}
