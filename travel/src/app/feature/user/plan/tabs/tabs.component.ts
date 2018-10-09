import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
})

export class TabsComponent implements OnInit, OnDestroy {
  tabs: TabComponent[] = [];

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}

  addTab(tab: TabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
      tab.color = '#ffd205';
      tab.colorTitle = '#fff';
    } else {
      tab.color = '#f9f9f9';
      tab.colorTitle = '#5e6d81';
    }
    this.tabs.push(tab);
  }

  removeTab() {
    this.tabs.pop();
  }

  selectTab(tab) {
    this.tabs.forEach((item) => {
      item.active = false;
      item.color = '#f9f9f9';
      item.colorTitle = '#5e6d81';
    });
    tab.colorTitle = '#fff';
    tab.color = '#ffd205';
    tab.active = true;
  }
}
