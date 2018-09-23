import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../../share/service/api.service';
import { DialogService } from '../../share/service/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { END_POINT } from '../../share/service/api.registry';

const MAX_LENGTH_USERNAME = 5;
const MIN_LENGTH_USERNAME = 20;
const MAX_LENGTH_PASSWORD = 5;

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password.component.html'
})

export class ResetComponent implements OnInit {
  formReset: FormGroup;
  errorMessage: string;
  password: string;
  confirmPassword: string;
  token: string;
  loader = false;

  constructor(private fb: FormBuilder,
              private apiService: APIService,
              private dialogService: DialogService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formReset = this.fb.group({
      password: ['', [
                      Validators.required,
                      Validators.minLength(MAX_LENGTH_USERNAME),
                      Validators.maxLength(MIN_LENGTH_USERNAME)
                    ]
                ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  passwordValidate() {
    this.password = this.formReset.controls.password.value;
    if (!this.password) {
      this.errorMessage = 'Password is required.';
    } else if (this.password.length < MAX_LENGTH_PASSWORD) {
      this.errorMessage = 'Password must greater than 5 character.';
    }
    return this.errorMessage;
  }

  confirmPasswordValidate() {
    this.confirmPassword = this.formReset.controls.confirmPassword.value;
    if (!this.password) {
      this.errorMessage = 'Password is required.';
    }
    return this.errorMessage;
  }

  checkconfirmPassword() {
    if (this.password === this.confirmPassword) {
      return true;
    }
    return false;
  }

  reset() {
    if (this.checkconfirmPassword()) {
      this.loader = true;
      this.token = this.route.snapshot.params['token'];
      const body = {
        newPassword: this.password,
        verifyPassword: this.confirmPassword,
      };
      this.apiService.post([END_POINT.auth, END_POINT.reset, this.token], body).subscribe(res => {
        this.dialogService.openDialog('Password was change', 'login-success');
        this.loader = false;
      }, err => {
        this.dialogService.openDialog(err.error.message, 'login-error');
        this.loader = false;
      });
    } else {
      this.dialogService.openDialog('Password not match', 'login-error');
      this.loader = false;
    }
  }
}
