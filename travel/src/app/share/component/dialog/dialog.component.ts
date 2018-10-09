import { Component, ElementRef, OnInit, HostListener, OnDestroy } from '@angular/core';
import { APIService } from '../../service/api.service';
import { DialogService } from '../../service/dialog.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})

export class DiaLogComponent implements OnInit {
  imageUrl: string;
  visible: boolean;
  isDialogConfirm = false;
  isDialogPicture = false;
  picture;

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
      const dialogName2 = 'dialog-picture';
      if (name === dialogName) {
        this.visible = true;
        this.isDialogConfirm = true;
      } else if (name === dialogName2) {
        this.visible = true;
        this.isDialogPicture = true;
        this.dialogService.picture.subscribe(picture => {
          this.picture = picture;

        });
      }
    });
  }

  deletePlan() {
    this.dialogService.isDeletePlans(true);
    this.closeDialog();
  }

  fetchUrl() {
    return environment.img_url + this.picture;
  }

  @HostListener('click', ['$event'])
  onclick(event) {
    if (event.target.className.split(' ')[0] === 'dialog-wrap') {
      this.visible = false;
      this.isDialogConfirm = false;
      this.isDialogPicture = false;
    }
  }
}
