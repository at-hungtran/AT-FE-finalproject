import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidation } from '../../validatiors/email.validators';
import { APIService } from '../../share/service/api.service';
import { END_POINT } from '../../share/service/api.registry';
import { DialogService } from '../../share/service/dialog.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password.component.html'
})

export class ForgotPasswodComponent implements OnInit {
  formForgot: FormGroup;
  errorMessage: string;
  successMessage: string;
  isEmailValid = true;
  isSuccess = false;
  email: string;
  loader = false;

  constructor(private fb: FormBuilder,
              private apiService: APIService,
              private dialogService: DialogService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formForgot = this.fb.group({
      email: ['', [Validators.required]],
    },
    {
      validator: [emailValidation]
    });
  }

  send() {
    if (this.emailValidate()) {
      this.loader = true;
      const body = {
        email: this.email
      };
      this.apiService.post([END_POINT.auth, END_POINT.forgot], body).subscribe(res => {
        this.dialogService.openDialog(res.message, 'login-success');
        this.loader = false;
        this.isSuccess = true;
        this.successMessage = 'please check your mail';
      }, (err) => {
        this.dialogService.openDialog(err.error.message, 'login-error');
        this.loader = false;
      });
    }
  }

  emailValidate() {
    this.email = this.formForgot.controls.email.value;
    const isValid = this.formForgot.controls.email.errors;
    if (!this.email) {
      this.errorMessage = 'Email is required';
      this.isEmailValid = false;
      this.isSuccess = false;
      return false;
    } else if (isValid) {
      this.errorMessage = 'Email invalid';
      this.isEmailValid = false;
      this.isSuccess = false;
      return false;
    } else {
      this.isEmailValid = true;
    }
    return true;
  }
}
