import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '@environment/environment';
import { Utilities } from 'app/shared/utils';
import { User } from '../model/user';
import { Observable } from 'rxjs';
// import { User } from 'app/shared/user';
// import { environment } from '@environment/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private role: string;
    private loggedIn = false;

    constructor(private http: Http) {}

    login(email: string, password: string) {
        return this.http.post(`${environment.baseUrl}${environment.logInUrl}`, { email, password })
            .pipe(
                map((res: any) => {
                    this.role = res;
                    this.loggedIn = true;
                    return true;
                }),
                catchError(Utilities.handleError)
            );
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this.role = '';
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    getRole() {
        return this.role;
    }







    // private currentUserSubject: BehaviorSubject<User>;
    // public currentUser: Observable<User>;

    // constructor(private http: HttpClient) {
    //     this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    //     this.currentUser = this.currentUserSubject.asObservable();
    // }

    // public get currentUserValue(): User {
    //     return this.currentUserSubject.value;
    // }

    // login(username: string, password: string) {
    //     // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
    //     //     .pipe(map(user => {
    //     //         // login successful if there's a jwt token in the response
    //     //         if (user && user.token) {
    //     //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     //             localStorage.setItem('currentUser', JSON.stringify(user));
    //     //             this.currentUserSubject.next(user);
    //     //         }

    //     //         return user;
    //     //     }));
    // }

    // logout() {
    //     // remove user from local storage to log user out
    //     localStorage.removeItem('currentUser');
    //     this.currentUserSubject.next(null);
    // }
}
