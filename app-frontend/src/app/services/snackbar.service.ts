import { Inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  type MatSnackBarConfig,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  // Configure snackbar config
  private readonly _config: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 10000,
  };

  constructor(@Inject(MatSnackBar) private readonly _snackbar: MatSnackBar) {}

  // This service is only for snackbar which would take
  // a string as a paramter to display in the snackbar
  // This eliminates the writing of function "openSnackbar"
  // in each file
  public openSnackbar(text: string): void {
    this._snackbar.open(text, 'Okay', this._config);
  }
}
