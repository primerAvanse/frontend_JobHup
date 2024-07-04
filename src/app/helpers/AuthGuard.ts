import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../services/login-service.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: LoginService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLogged = this.authenticationService.isLoggedIn();
    if (isLogged) {
      return true;
    }

    this.authenticationService.logout();

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
