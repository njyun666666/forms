import { LoadingService } from './loading.service';
import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogModel } from '../../shared/models/dialog-model';
import { DialogComponent } from '../../shared/component/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private loadingService: LoadingService
  ) { }


  text(data: DialogModel) {

    data.btnCancalShow = false;

    this.dialog.open(DialogComponent, {
      minWidth: 300,
      data: data
    });

  }

  goHome(data: DialogModel) {
    data.btnCancalShow = false;

    const dialogRef = this.dialog.open(DialogComponent, {
      minWidth: 300,
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/']);
      this.loadingService.loading$.next(false);
    });

  }

  goto(data: DialogModel, url: string, extras?: NavigationExtras) {
    data.btnCancalShow = false;

    const dialogRef = this.dialog.open(DialogComponent, {
      minWidth: 300,
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([url], extras);
    });

  }

  showDialog(data: DialogModel) {
    return this.dialog.open(DialogComponent, {
      minWidth: 300,
      data: data
    });
  }


}
