import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { tap } from 'rxjs/operators/tap';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  public securityObject: AppUserAuth;

  constructor(private http: HttpClient) {
    const secObject = localStorage.getItem('secobject');
    if (secObject != null) {
      this.securityObject = JSON.parse(secObject);
    } else {
      this.securityObject = new AppUserAuth();
    }
  }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject(): void {
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;
    this.securityObject.claims = [];

    localStorage.removeItem('bearerToken');
    localStorage.removeItem('secobject');
  }

  // This method can be called a couple of different ways
  // *hasClaim="'claimType'" // Assumes claimValue is true
  // *hasClaim="'claimType:value'" // Compares claimValue to value
  // *hasClaim="['claimType1', 'claimType2:value', 'claimType13']"
  hasClaim(claimType: any, claimValue?: any) {
    let ret = false;

    // See if an array of values was passed in.
    if (typeof claimType === 'string') {
      ret = this.isClaimValid(claimType, claimValue);
    } else {
      const claims: string[] = claimType;
      if (claims) {
       // console.log('Claims ', claims);
        for (let i = 0; i < claims.length; i++) {
          ret = this.isClaimValid(claims[i]);
          // If one is successful, then let them in
          if (ret) {
            break;
          }
        }
      }
    }
    // return this.isClaimValid(claimType, claimValue);
    return ret;
  }

  private isClaimValid(claimType: string, claimValue?: string): boolean {
    let ret = false;
    let auth: AppUserAuth = null;

    // Retrieve secrity object
    auth = this.securityObject;
    if (auth) {
      // See if the claim type has a value
      // *hasClaim = "'claimType:value'"
      if (claimType.indexOf(':') >= 0) {
        const words: string[] = claimType.split(':');
        claimType = words[0].toLowerCase();
        claimType = words[1];
      } else {
        claimType = claimType.toLowerCase();
        // Either get the claim value or assume 'true'
        claimValue = claimValue ? claimValue : 'true';
      }
      ret = auth.claims.find(c =>
        c.claimType.toLowerCase() === claimType &&
        c.claimValue === claimValue) != null;
    }
    return ret;
  }

  login(entity: AppUser): Observable<AppUserAuth> {
    // Initialize security object
    this.resetSecurityObject();

    return this.http.post<AppUserAuth>(`${environment.baseUrl}${environment.login}`,
      entity).pipe(
        tap(resp => {
          // Use object assign to update the current object
          // NOTE: Don't create a new AppUserAuth object
          //       because that destroys all references to object
          Object.assign(this.securityObject, resp);
          // Store into local storage
          localStorage.setItem('bearerToken', this.securityObject.bearerToken);
          localStorage.setItem('secobject', JSON.stringify(this.securityObject));
        }));
  }
}
