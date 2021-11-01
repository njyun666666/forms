import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlowchartModel } from 'app/@core/models/flowchart/flowchart.model';

@Component({
  selector: 'ngx-flowchart-dialog',
  templateUrl: './flowchart-dialog.component.html',
  styleUrls: ['./flowchart-dialog.component.scss']
})
export class FlowchartDialogComponent implements OnInit {

  constructor(
    // public dialogRef: MatDialogRef<FlowchartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FlowchartModel
  ) { }

  ngOnInit(): void {
    // console.log(this.data);
  }

}
