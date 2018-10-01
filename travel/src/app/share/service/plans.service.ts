import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class PlansService {
  plans = [];

  constructor() {}

  bindToPlans(plan) {
    this.plans.push(plan);
    console.log(this.plans);
  }

  getPlans() {
    return this.plans;
  }
}
