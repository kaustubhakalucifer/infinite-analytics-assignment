import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AuthGuard } from './guard/auth.guard';
import { ProfileComponent } from './assignment/profile/profile.component';
import { CryptoComponent } from './assignment/crypto/crypto.component';
import { WeatherComponent } from './assignment/weather/weather.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'assignment',
    component: AssignmentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'crypto',
        component: CryptoComponent,
      },
      {
        path: 'weather',
        component: WeatherComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
