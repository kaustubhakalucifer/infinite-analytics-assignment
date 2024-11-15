import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    CommonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  public email = '';
  public currentActiveRoute = '';

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.currentActiveRoute = _router.url;
    this.loadUserData();
  }

  loadUserData() {
    this._userService.getUserData().subscribe({
      next: (response) => {
        this.email = response['data']['emailAddress'];
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  logout() {
    this._authService.logout();
  }

  public sidenavRouting(router: string): void {
    this.currentActiveRoute = router;
  }
}
