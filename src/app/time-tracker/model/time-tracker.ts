

/* Defines the time tracker entity */
export interface ITimeTracker {
    studentId: string;
    inTime: Date;
    outTime?: Date;
    total?: number;
}
