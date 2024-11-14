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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginFormGroup: FormGroup<ILoginForm>;
  public loginButtonClicked = false;

  constructor(
    @Inject(FormBuilder) private readonly _formBuilder: FormBuilder,
    @Inject(AuthService) private _authService: AuthService
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

  private _getSessionDetails(): void {}
}
