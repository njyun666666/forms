import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModel } from '../../models/dialog-model';



@Component({
  selector: 'ngx-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  dialogData: DialogModel = {
    title: '',
    content: '',
    btnColor: 'basic',
    btnText: 'OK',
    btnCancalShow: true
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel
  ) { }

  ngOnInit(): void {

    this.dialogData = Object.assign(this.dialogData, this.data);


  }

}
