import { type FormControl } from '@angular/forms';

export interface ILoginForm {
  emailAddress: FormControl<string>;
  password: FormControl<string>;
}
