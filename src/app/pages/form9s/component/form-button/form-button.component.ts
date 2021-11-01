import { Form9sService } from './../../../../@core/services/form9s/form9s.service';
import { DialogService } from './../../../../@core/services/dialog.service';
import { DialogComponent } from '../../../../shared/component/dialog/dialog.component';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ngx-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements OnInit, OnChanges {

  @Input() formInfo;
  @Input() in_show_deleteDraftBtn: boolean = false;
  @Output() deleteDraftEmitter = new EventEmitter();
  @Output() draftEmitter = new EventEmitter();
  @Output() applicantEmitter = new EventEmitter();



  constructor(
    private dialogService: DialogService,
    private form9sService: Form9sService
  ) { }


  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.in_show_deleteDraftBtn);
  }



  /**
   * 刪除草稿
   */
  deleteDraft() {
    const dialogRef = this.dialogService.showDialog({
      content: '刪除草稿?',
      btnText: '刪除',
      btnColor: 'danger'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDraftEmitter.emit();
      }
    });

  }

  /**
   * 草稿
   */
  draft() {
    const dialogRef = this.dialogService.showDialog({
      content: '儲存草稿?',
      btnText: '儲存'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.draftEmitter.emit();
      }
    });

  }

  /**
   * 送出申請
   */
  applicant() {

    const dialogRef = this.dialogService.showDialog({
      content: '送出申請?',
      btnColor: 'primary',
      btnText: '送出'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applicantEmitter.emit();
      }
    });



  }

}
