import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { APIService } from '../../share/service/api.service';
import { END_POINT } from '../../share/service/api.registry';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {
  user;
  userId;
  avatarDefault = '../../../../assets/images/default-avt.jpg';
  url = 'http://localhost:3000/uploads/';

  navigateList = [
    {
      name: 'Pictures',
      routerLink: 'pictures'
    },
    {
      name: 'Plans',
      routerLink: 'plans'
    },
  ];

  constructor(private fb: FormBuilder,
              private apiService: APIService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.setUser();
  }

  setUser() {
    this.apiService.get([END_POINT.users, this.userId]).subscribe(user => {
      this.user = user[0];
    });
  }

  fetchUrl() {
    if (this.user.avatar) {
      return this.url + this.user.avatar;
    }
    return this.avatarDefault;
  }
}
