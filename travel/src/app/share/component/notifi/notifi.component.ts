import { Component, OnInit } from '@angular/core';
import { trigger,
         state,
         style,
         animate,
         transition } from '@angular/animations';

import { DialogService } from '../../service/dialog.service';

@Component({
  selector: 'app-notifi',
  templateUrl: './notifi.component.html',
  animations: [
    trigger('popOverState', [
      state('show', style({
        transform: 'translate(0,0)',
        opacity: 1
      })),
      state('hide', style({
        transform: 'translate(0,200px)',
        opacity: 0
      })),
      transition('show => hide', animate('200ms ease-in-out')),
      transition('hide => show', animate('200ms ease-in'))
    ])
  ]
})

export class NotifiComponent implements OnInit {
  isVisibleSuccess = false;
  isVisibleError = false;
  message = '';
  successShow = false;
  errorShow = false;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this.onpenDialog();
  }

  get success() {
    return this.successShow ? 'show' : 'hide';
  }

  get error() {
    return this.errorShow ? 'show' : 'hide';
  }

  onpenDialog() {
    this.dialogService.newModalName.subscribe(name => {
      this.setMessage();
      if (name === 'login-success') {
        this.errorShow = false;
        this.successShow = true;
        this.closeDialog('login-success');
      } else if (name === 'login-error') {
        this.successShow = false;
        this.errorShow = true;
        this.closeDialog('login-error');
      }
    });
  }

  setMessage() {
    this.dialogService.newMessage.subscribe(message => {
      this.message = message;
    });
  }

  closeDialog(dialogName: string) {
    setTimeout(() => {
     this.close(dialogName);
    }, 3000);
  }

  close(dialogName: string) {
    if (dialogName === 'login-success') {
      this.successShow = false;
    } else if (dialogName === 'login-error') {
      this.errorShow = false;
    }
  }
}
