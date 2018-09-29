import { Component, OnInit } from '@angular/core';
import { trigger,
  state,
  style,
  animate,
  transition } from '@angular/animations';
import { FormBuilder,
  Validators,
  FormGroup,
  FormControl } from '@angular/forms';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
   animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('200ms ease-in-out')),
      transition('hide => show', animate('200ms ease-in'))
    ])
  ]
})

export class PlanComponent implements OnInit {
  successShow = false;
  formDate: FormGroup;
  startDate;
  endDate;
  listDate = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.checkDate();
  }

  openForm() {
    this.successShow = true;
  }

  get success() {
    return this.successShow ? 'show' : 'hide';
  }

  createForm() {
    this.formDate = this.fb.group({
      start: ['',  [Validators.required]],
      end: [{value: '', disabled : true}]
    });
  }
  checkDate() {
    this.formDate.controls.start.valueChanges
    .subscribe(startDate => {
      this.startDate = startDate;
      this.formDate.controls['end'].enable();
    });

    this.formDate.controls.end.valueChanges
    .subscribe(endDate => {
      this.endDate = endDate;
      this.listDate = [];
      const listNumberDateStart = this.startDate.split('-');
      const listNumberDateEnd = this.endDate.split('-');
      const _endDate = new Date(listNumberDateEnd);
      let _startDate = new Date(listNumberDateStart);
      let count = 0;
      while (_startDate < _endDate) {
        if (count === 0) {
          _startDate = new Date(_startDate.setDate(_startDate.getDate()));
        } else {
          _startDate = new Date(_startDate.setDate(_startDate.getDate() + 1));
        }
        const date = `${_startDate.getMonth() + 1}/${_startDate.getDate()}/${_startDate.getFullYear()}`;
        this.listDate.push(date);
        count = 1;
      }
    });
  }
}
