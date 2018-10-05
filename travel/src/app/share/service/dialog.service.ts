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
  notifiDeleteDf = false;
  notifiDelete =  new BehaviorSubject(this.notifiDeleteDf);

  openDialog(message: string, modalName: string) {
    this.newModalName.next(modalName);
    this.newMessage.next(message);
  }

  isDeletePlans(notifiDelete) {
    this.notifiDelete.next(notifiDelete);
  }
}
