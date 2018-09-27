import { AbstractControl } from '@angular/forms';

export function userNameValidation(abstractControl: AbstractControl) {
  const userName = abstractControl.get('userName').value;
  const userNamePattern = '^[a-zA-Z0-9_.-]*$';
  if (!userName.match(userNamePattern)) {
    abstractControl.get('userName').setErrors({MatchUsername: true});
  } else {
    return null;
  }
}
