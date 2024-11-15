import { Inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private readonly _authService: AuthService,
    @Inject(Router) private readonly _router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this._authService.getSessionDetails().pipe(
      map((user) => {
        if (user.email) {
          return true;
        } else {
          this._router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
