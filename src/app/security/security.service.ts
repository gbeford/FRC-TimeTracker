import { Injectable } from '@angular/core';
import { AppUserAuth } from './app-user-auth';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { LOGIN_MOCKS } from './login-mocks';
import { AppUser } from './app-user';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth;

  constructor() { }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject(): void {
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthentiucated = false;

    this.securityObject.canAccess_Admin = false;
    this.securityObject.canAccess_Student = false;

    localStorage.removeItem('bearerToken');
  }

  login(entity: AppUser): Observable<AppUserAuth> {
    // Initialize security object
    this.resetSecurityObject();

    // Use object assigned to update the current object
    // NOTE: Don't create a new AppUserAuth object
    //       because that destroys all refrences to object
    Object.assign(this.securityObject,
      LOGIN_MOCKS.find(user => user.userName.toLowerCase() ===
        entity.userName.toLowerCase()));

    if (this.securityObject.userName !== '') {
      // Store token into local storage
      localStorage.setItem('bearerToken',
        this.securityObject.bearerToken);
    }
    return of<AppUserAuth>(this.securityObject);
  }
}
