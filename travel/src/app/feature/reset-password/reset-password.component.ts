import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../../share/service/api.service';
import { DialogService } from '../../share/service/dialog.service';
import { ActivatedRoute } from '@angular/router';

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
  userName: string;
  password: string;

  constructor(private fb: FormBuilder,
              private apiService: APIService,
              private dialogService: DialogService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.createForm();
    console.log(this.route.snapshot.params['token']);
  }

  createForm() {
    this.formReset = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(MAX_LENGTH_USERNAME), Validators.maxLength(MIN_LENGTH_USERNAME)]],
      password: ['', [Validators.required]],
    });
  }

  userNameValidate() {
    this.userName = this.formReset.controls.userName.value;
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
    this.password = this.formReset.controls.password.value;
    if (!this.password) {
      this.errorMessage = 'password is required.';
    } else if (this.userName.length < MAX_LENGTH_PASSWORD) {
      this.errorMessage = 'User Name must greater than 5 character.';
    }
    return this.errorMessage;
  }

  reset() {

  }
}
