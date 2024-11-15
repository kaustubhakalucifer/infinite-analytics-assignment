import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ILoginForm } from './interface';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginFormGroup: FormGroup<ILoginForm>;
  public loginButtonClicked = false;

  constructor(
    @Inject(FormBuilder) private readonly _formBuilder: FormBuilder,
    @Inject(AuthService) private _authService: AuthService,
    private readonly _router: Router,
    private readonly _snackbarService: SnackbarService
  ) {
    this.loginFormGroup = this._formBuilder.group({
      emailAddress: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public loginWithGoogle(): void {
    this._authService.loginWithGoogle();
  }

  public login(): void {
    this.loginButtonClicked = true;
    if (!this.loginFormGroup.invalid) {
      this._authService
        .loginService({
          emailAddress: this.loginFormGroup.controls.emailAddress.value,
          password: this.loginFormGroup.controls.password.value,
        })
        .subscribe({
          next: (response) => {
            this._snackbarService.openSnackbar(response.message);
            this._router.navigate(['assignment/crypto']);
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
            this._snackbarService.openSnackbar(error.error.message);
          },
        });
    }
  }
}
