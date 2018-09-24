import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DialogService {
  modalName = '';
  newModalName = new BehaviorSubject(this.modalName);
  message = '';
  newMessage =  new BehaviorSubject(this.message);

  openDialog(message: string, modalName: string) {
    this.newModalName.next(modalName);
    this.newMessage.next(message);
  }
}
