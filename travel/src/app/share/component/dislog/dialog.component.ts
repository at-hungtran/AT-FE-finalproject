import { Component, ElementRef, OnInit, HostListener } from '@angular/core';
import { APIService } from '../../service/api.service';
import { DialogService } from '../../service/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})

export class DiaLogService implements OnInit {
  imageUrl: string;
  visible: boolean;

  constructor(private apiService: APIService,
              private dialogService: DialogService,
              private el: ElementRef) {}

  ngOnInit() {
    this.openDialog();
  }

  closeDialog() {
    this.visible = false;
  }

  openDialog() {
    this.dialogService.newModalName.subscribe(name => {
      const dialogName = 'dialog-confirm';
      if (name === dialogName) {
        this.visible = true;
      }
    });
  }

  deletePlan() {
    this.dialogService.isDeletePlans(true);
    this.closeDialog();
  }

  @HostListener('click', ['$event']) onclick(event) {
    if (event.target.className === 'dialog-wrap') {
      this.visible = false;
    }
  }
}
