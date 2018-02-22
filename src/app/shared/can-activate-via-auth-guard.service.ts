import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { take, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateViaAuthGuardService implements CanActivate {

  constructor(private afAuth: AngularFireAuth,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['/']);
        }
      }));
  }

}
