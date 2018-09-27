import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { APIService } from '../../share/service/api.service';
import { END_POINT } from '../../share/service/api.registry';
import { StorageService } from '../../share/service/storage.service';
import { DialogService } from '../../share/service/dialog.service';
import { Router } from '@angular/router';
import { CheckUserService } from '../../share/service/check-user.service';

const MAX_LENGTH_USERNAME = 5;
const MIN_LENGTH_USERNAME = 20;
const MAX_LENGTH_PASSWORD = 5;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  errorMessage: string;
  serverError: String;
  isMessage: boolean;
  loginMessage = { 'message': ' ', 'messageName':  '' };
  formLogin: FormGroup;
  error = [];
  show = false;
  loader = false;

  constructor(private fb: FormBuilder,
              private apiService: APIService,
              private storageService: StorageService,
              private dialogService: DialogService,
              private router: Router,
              private checkUserService: CheckUserService) {}

  ngOnInit() {
    this.createForm();
  }

  get stateName() {
    return this.show ? 'show' : 'hide';
  }

  createForm() {
    this.formLogin = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(MAX_LENGTH_USERNAME), Validators.maxLength(MIN_LENGTH_USERNAME)]],
      password: ['', [Validators.required]],
    });
  }

  userNameValidate() {
    this.userName = this.formLogin.controls.userName.value;
    this.errorMessage = '';
    if (!this.userName) {
      this.errorMessage = 'User Name is required.';
    } else if (this.userName.length <= MAX_LENGTH_USERNAME) {
      this.errorMessage = 'User Name must greater than 5 character.';
    } else if (this.userName.length > MAX_LENGTH_USERNAME) {
      this.errorMessage = 'User Name must less than 20 character.';
    }
    return this.errorMessage;
  }

  passwordValidate() {
    this.password = this.formLogin.controls.password.value;
    if (!this.password) {
      this.errorMessage = 'password is required.';
    } else if (this.userName.length < MAX_LENGTH_PASSWORD) {
      this.errorMessage = 'User Name must greater than 5 character.';
    }
    return this.errorMessage;
  }

  login() {
    this.loader = true;
    const body = {
      userName: this.formLogin.controls.userName.value,
      password: this.formLogin.controls.password.value
    };
    this.apiService.post([END_POINT.auth, END_POINT.login], body).subscribe(res => {
      this.storageService.set('token', res.token);
      this.dialogService.openDialog('login success', 'login-success');
      this.checkUserService.isUserLogin(true);
      this.loader = false;
      this.router.navigate(['/home']);
    }, err => {
      this.dialogService.openDialog(err.error.error, 'login-error');
      this.loader = false;
    });
  }
}
