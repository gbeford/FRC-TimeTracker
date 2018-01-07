import { Roles } from './roles';

export interface User {
    displayName: string,
    uid: string;
    email: string;
    roles: Roles;
    lastLogin: Date;
}
