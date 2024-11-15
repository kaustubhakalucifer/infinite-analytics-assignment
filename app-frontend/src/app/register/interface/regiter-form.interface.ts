import { type FormControl } from '@angular/forms';

export interface IRegisterForm {
  emailAddress: FormControl<string>;
  password: FormControl<string>;
}
