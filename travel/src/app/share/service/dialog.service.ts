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
  idPlanDf = false;
  idPlan = new BehaviorSubject(this.idPlanDf);
  plansDf = [];
  plans = new BehaviorSubject(this.plansDf);
  planId;
  date;
  pictureDf = '';
  picture = new BehaviorSubject(this.pictureDf);

  openDialog(message: string, modalName: string, picture?: string) {
    this.newModalName.next(modalName);
    this.newMessage.next(message);
    this.picture.next(picture);
  }

  isDeletePlans(notifiDelete) {
    this.notifiDelete.next(notifiDelete);
  }

  setIdPlan(planId) {
    this.idPlan.next(planId);
  }

  setPlanEdit(plans, planId, date) {
    this.date = date;
    this.planId = planId;
    this.plans.next(plans);
  }
}
