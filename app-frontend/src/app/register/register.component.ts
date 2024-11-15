import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IRegisterForm } from './interface/regiter-form.interface';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public registerFormGroup: FormGroup<IRegisterForm>;
  public registerButtonClicked = false;

  constructor(
    @Inject(FormBuilder) private readonly _formBuilder: FormBuilder,
    @Inject(AuthService) private _authService: AuthService,
    private readonly _router: Router,
    private readonly _snackbarService: SnackbarService
  ) {
    this.registerFormGroup = this._formBuilder.group({
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

  public register(): void {
    this.registerButtonClicked = true;
    if (!this.registerFormGroup.invalid) {
      this._authService
        .registerService({
          emailAddress: this.registerFormGroup.controls.emailAddress.value,
          password: this.registerFormGroup.controls.password.value,
        })
        .subscribe({
          next: (response) => {
            this._snackbarService.openSnackbar(response['message']);
            this._router.navigate(['login']);
          },
          error: (error: HttpErrorResponse) => {
            this._snackbarService.openSnackbar(error.error.message);
          },
        });
    }
  }
}
