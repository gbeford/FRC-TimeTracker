

/* Defines the time tracker entity */
export interface ITimeTracker {
    studentId: string;
    createDate: string;
    inTime: Date;
    outTime?: Date;
    total?: number;
}
