import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../service/dialog.service';

@Component({
  selector: 'app-notifi',
  templateUrl: './notifi.component.html'
})

export class NotifiComponent implements OnInit {
  isVisibleSuccess = false;
  isVisibleError = false;
  message = '';

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this.onpenDialog();
  }

  onpenDialog() {
    this.dialogService.newModalName.subscribe(name => {
      this.setMessage();
      if (name === 'login-success') {
        this.isVisibleSuccess = true;
        this.isVisibleError = false;
        this.closeDialog('login-success');
      } else if (name === 'login-error') {
        this.isVisibleError = true;
        this.isVisibleSuccess = false;
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
      this.isVisibleSuccess = false;
    } else if (dialogName === 'login-error') {
      this.isVisibleError = false;
    }
  }
}
