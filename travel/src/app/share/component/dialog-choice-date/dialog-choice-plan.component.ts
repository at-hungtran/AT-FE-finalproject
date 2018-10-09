import { Component, OnInit, HostListener, Input, OnDestroy } from '@angular/core';
import { DialogService } from '../../service/dialog.service';

@Component({
  selector: 'app-dialog-choice',
  templateUrl: './dialog-choice-plan.component.html'
})

export class DiaLogChoiceComponent implements OnInit, OnDestroy {
  isVisible = false;
  idPlan;
  planEdit;
  timeline;

  @Input() listPlans;

  ngOnInit() {
    this.isVisible = false;
    this.setIdPlan();
  }

  ngOnDestroy() {
    this.dialogService.setIdPlan('');
    this.dialogService.setPlanEdit([], '', '');
  }

  constructor(private dialogService: DialogService) {}

  setIdPlan() {
    this.dialogService.idPlan.subscribe(idPlan => {
      if (idPlan) {
        this.isVisible = true;
        this.idPlan = idPlan;
        this.setPlanEdit(idPlan);
      }
    });
  }

  setPlanEdit(planId) {
    this.planEdit = this.listPlans.filter(plan => {
      return plan._id === planId;
    });
    this.planEdit =  this.planEdit[0];
    this.setTimeLine();
  }

  setTimeLine() {
    this.timeline = this.planEdit.timeline;
  }

  openEditModel(date) {
    const plans = this.timeline.filter(plan => {
      return plan.date === date;
    });
    this.dialogService.setPlanEdit(plans[0].plans, this.idPlan, date);
    this.isVisible = false;
  }

  @HostListener('click', ['$event'])
  onclick(event) {
    const className = 'dialog-wrap';
    if (event.target.className.split(' ')[0] === className) {
      this.isVisible = false;
    }
  }
}
