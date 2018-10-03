import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PlansService {
  plans = [];
  isSaveAllVisible = false;
  isSaveAllVisibleChange = new BehaviorSubject(this.isSaveAllVisible);

  constructor() {}

  bindToPlans(plan) {
    this.plans.push(plan);
  }

  getPlans() {
    return this.plans;
  }

  saveAllSuccess(isVisible) {
    this.isSaveAllVisibleChange.next(isVisible);
  }
}
