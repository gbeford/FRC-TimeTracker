import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private securityService: SecurityService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const claim: string[] = next.data['claim'];

    if (this.securityService.securityObject.isAuthenticated
      && this.securityService.hasClaim(claim)) {
      return true;
    } else {
      this.router.navigate(['/'],
        { queryParams: { returnUrl: state.url } });
    }
  }
}
