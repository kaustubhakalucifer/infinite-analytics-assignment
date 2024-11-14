import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
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
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  public email = '';

  constructor(
    private _userService: UserService,
    private _authService: AuthService
  ) {
    this.loadUserData();
  }

  loadUserData() {
    this._userService.getUserData().subscribe({
      next: (response) => {
        console.log(response);
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
}
