import { Component, OnInit } from '@angular/core';
import { Destination } from '../../share/model/destination';
import { trigger,
  state,
  style,
  animate,
  transition } from '@angular/animations';
import { APIService } from '../../share/service/api.service';
import { END_POINT } from '../../share/service/api.registry';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './alldes.component.html',
  selector: 'app-alldes',
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('300ms ease-in-out')),
      transition('hide => show', animate('300ms ease-in'))
    ])
  ]
})

export class AllDesComponent implements OnInit {
  
  listDestinations;
  listBackground;
  listDesSearch;
  state = false;
  formSearch : FormGroup;
  term;

  constructor(private fb: FormBuilder,
              private api: APIService
  ) {

  }

  ngOnInit() {
    this.createForm();
    this.bindToDestination();
    this.suggetSearch();
  }
  bindToDestination() {
    this.api.get([END_POINT.destinations]).subscribe((item) => {
      this.listDestinations = item;
      this.listDesSearch = item;
    })
  }

  createForm() {
    this.formSearch = this.fb.group({
      destination: [''],
    });
  }

  suggetSearch() {
    this.formSearch.controls.destination.valueChanges
    .subscribe((value) => {
      if(value) {
        this.state = true;
        this.term = value;
      } else {
        this.state = false;
      }
    })
  }
}
