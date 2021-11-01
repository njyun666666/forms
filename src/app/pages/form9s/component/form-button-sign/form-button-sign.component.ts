import { DialogService } from './../../../../@core/services/dialog.service';
import { Form9sService } from 'app/@core/services/form9s/form9s.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SignOptionType } from 'app/@core/Enum/sign-option-type.enum';
import { SignResultType } from 'app/@core/Enum/sign-result-type.enum';
import { NbColor } from 'app/@core/types/nb-color';
import { GetSignOptionModel, SignOptionModel } from 'app/@core/models/form9s/sign/sign-option.model';

@Component({
  selector: 'ngx-form-button-sign',
  templateUrl: './form-button-sign.component.html',
  styleUrls: ['./form-button-sign.component.scss']
})
export class FormButtonSignComponent implements OnInit {


  @Input() in_signOptionModel: GetSignOptionModel;
  @Output() signEmitter = new EventEmitter();

  list: SignOptionModel[] = [];



  constructor(
    private form9sService: Form9sService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {


    if (this.in_signOptionModel !== undefined && this.in_signOptionModel !== null) {
      this.getSignOption(this.in_signOptionModel);
    }


  }


  getSignOption(option: GetSignOptionModel) {
    this.form9sService.getSignOption(option).subscribe((data) => {
      this.list = data;
    });
  }

  setBtnColor(resultID: SignResultType) {

    let color: NbColor;

    switch (resultID) {
      case SignResultType.agree:
        color = 'success';
        break;
      case SignResultType.reject:
        color = 'danger';
        break;

      default:
        color = 'basic';
        break;
    }

    return color;
  }


  /**
 * 送出
 */
  submit(option: SignOptionModel) {

    const dialogRef = this.dialogService.showDialog({
      content: `${option.text}?`,
      btnText: `${option.text}`,
      btnColor: this.setBtnColor(option.resultID)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.signEmitter.emit(option);
      }
    });

  }



}
