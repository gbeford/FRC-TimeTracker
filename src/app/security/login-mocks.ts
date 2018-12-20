import { AppUserAuth } from './app-user-auth';

export const LOGIN_MOCKS: AppUserAuth[] = [
    {
        userName: 'Gbeford',
        bearerToken: 'abi393kdkd9393ikd',
        isAuthenticated: true,
        canAccess_Admin: true,
        canAccess_Student: true
    },
    {
        userName: 'tsom',
        bearerToken: 'sd9f923k3kdmcjkhd',
        isAuthenticated: true,
        canAccess_Admin: false,
        canAccess_Student: true
    }
];
