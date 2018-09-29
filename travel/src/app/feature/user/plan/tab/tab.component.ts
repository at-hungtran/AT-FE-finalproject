import { Component, OnInit, Input } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
})

export class TabComponent implements OnInit {
  active: boolean;
  color: string;
  colorTitle = '#5e6d81';

  @Input() tabtitle: string;

  constructor(tabs: TabsComponent,
              private fb: FormBuilder) {
    tabs.addTab(this);
  }

  ngOnInit() {}

  createFomr() {

  }
}
