import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PlansService {
  plans = [];
  isSaveAllVisible = false;
  isSaveAllVisibleChange = new BehaviorSubject(this.isSaveAllVisible);
  isFormOpenDf = false;
  isFormOpen = new BehaviorSubject(this.isFormOpenDf);
  isListPlansUpdateDf = false;
  isListPlansUpdate = new BehaviorSubject(this.isListPlansUpdateDf);

  constructor() {}

  bindToPlans(plan) {
    this.plans.push(plan);
  }

  setToPlans(plans) {
    this.plans = plans;
  }

  getPlans() {
    return this.plans;
  }

  resetListPlans() {
    this.plans = [];
  }

  saveAllSuccess(isVisible) {
    this.isSaveAllVisibleChange.next(isVisible);
  }

  openForm(isFormOpen) {
    this.isFormOpen.next(isFormOpen);
  }

  updateListPlans(isListPlansUpdate) {
    this.isListPlansUpdate.next(isListPlansUpdate);
  }
}
