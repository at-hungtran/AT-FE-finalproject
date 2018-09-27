import { AbstractControl } from '@angular/forms';

export function emailValidation(abstractControl: AbstractControl) {
  const email = abstractControl.get('email').value;
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.match(emailPattern)) {
    abstractControl.get('email').setErrors({MatchEmail: true});
  } else {
    return null;
  }
}
