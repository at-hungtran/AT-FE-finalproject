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
import { APIService } from '../../../share/service/api.service';
import { END_POINT } from '../../../share/service/api.registry';

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
  listCategory;
  listSite;

  constructor(private fb: FormBuilder,
              private apiService: APIService) {}

  ngOnInit() {
    this.createForm();
    this.checkDate();
    this.bindToListCategory();
    this.bindToListSite();
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
      this.startDate = new Date(startDate);
      this.formDate.controls['end'].enable();
    });

    this.formDate.controls.end.valueChanges
    .subscribe(endDate => {
      this.endDate = endDate;
      this.listDate = [];
      console.log(this.startDate.getDate());
      const _endDate = new Date(this.endDate);
      let _startDate = new Date(this.startDate);
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

  bindToListCategory() {
    this.apiService.get([END_POINT.categorys]).subscribe(category => {
      this.listCategory = category;
    });
  }

  bindToListSite() {
    this.apiService.get([END_POINT.sites]).subscribe(sites => {
      this.listSite = sites;
    });
  }
}
