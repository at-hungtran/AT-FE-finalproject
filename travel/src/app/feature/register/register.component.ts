import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../share/service/dialog.service';
import { APIService } from '../../share/service/api.service';
import { emailValidation } from '../../validatiors/email.validators';
import { END_POINT } from '../../share/service/api.registry';
import { Router } from '@angular/router';

const MAX_LENGTH_USERNAME = 5;
const MIN_LENGTH_USERNAME = 20;
const MAX_LENGTH_PASSWORD = 5;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  userName: string;
  password: string;
  email: string;
  loader = false;
  isEmailValid = true;
  isSuccess = false;
  formRegister: FormGroup;
  errorMessage: string;
  registerMessage = { 'message': ' ', 'messageName':  '' };

  constructor(private dialogService: DialogService,
              private apiService: APIService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formRegister = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(MAX_LENGTH_USERNAME), Validators.maxLength(MIN_LENGTH_USERNAME)]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required]],
      hobbies: [''],
    },
    {
      validator: [emailValidation]
    });
  }

  userNameValidate() {
    this.userName = this.formRegister.controls.userName.value;
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
    this.password = this.formRegister.controls.password.value;
    if (!this.password) {
      this.errorMessage = 'password is required.';
    } else if (this.userName.length < MAX_LENGTH_PASSWORD) {
      this.errorMessage = 'User Name must greater than 5 character.';
    }
    return this.errorMessage;
  }

  emailValidate() {
    this.email = this.formRegister.controls.email.value;
    const isValid = this.formRegister.controls.email.errors;
    if (!this.email) {
      this.errorMessage = 'Email is required.';
    } else if (emailValidation) {
      this.errorMessage = 'Email invalid.';
    }
    return this.errorMessage;
  }

  singIn(formRegister) {
    this.loader = true;
    const dialogName = 'login-success';
    const dialogEror = 'login-error';
    const dialogMessage = 'create success';
    const body = formRegister.value;
    this.apiService.post([END_POINT.users], body).subscribe(value => {
      if (value) {
        this.dialogService.openDialog(dialogMessage, dialogName);
        this.loader = false;
        this.router.navigate(['/login']);
      }
    }, (error) => {
      this.loader = false;
      this.dialogService.openDialog(error.error.error, dialogEror);
    });
  }
}
