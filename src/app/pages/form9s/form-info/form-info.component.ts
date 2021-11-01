import { LoadingService } from './../../../@core/services/loading.service';
import { DialogService } from './../../../@core/services/dialog.service';
import { SignFormModel } from './../../../@core/models/form9s/sign/sign-form.model';
import { Form9sService } from 'app/@core/services/form9s/form9s.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormListModel } from 'app/@core/models/form9s/form/form-list.model';
import { FormBaseDataModel } from 'app/@core/models/form9s/form/form-base-data.model';
import { SignOptionType } from 'app/@core/Enum/sign-option-type.enum';
import { GetSignOptionModel, SignOptionModel } from 'app/@core/models/form9s/sign/sign-option.model';
import { SignResultType } from 'app/@core/Enum/sign-result-type.enum';
import { ResponseCode } from 'app/@core/Enum/response-code.enum';

@Component({
  selector: 'ngx-form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.scss']
})
export class FormInfoComponent implements OnInit {


  baseData: FormBaseDataModel;
  formData: FormListModel;

  signOptionModel: GetSignOptionModel = {
    typeID: SignOptionType.applicant
  };


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private form9sService: Form9sService,
    private dialogService: DialogService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {


    this.baseData = this.route.snapshot.data['baseData'];
    this.formData = this.route.snapshot.data['formData'];
    this.signOptionModel.formID = this.formData.formID;


  }


  sign(option: SignOptionModel) {
    // console.log(option);
    // this.form9sService.signBtn$.next(option);

    switch (option.resultID) {

      default:
        this.signSetResult(option);
        break;
    }


  }

  signSetResult(option: SignOptionModel) {

    const data: SignFormModel = {
      formID: this.formData.formID,
      signOptionID: option.id,
      signOption: option.text,
      signResultID: option.resultID,
      status: 1,
    };


    this.form9sService.signSetResult(data).subscribe((data) => {
      if (data.code === ResponseCode.success) {

        const url = '/form/info';
        const extras: NavigationExtras = {
          queryParams: {
            formID: this.formData.formID
          }
        };

        this.dialogService.goto({ content: `已${option.text}` }, url, extras);

      } else {

        this.loadingService.loading$.next(false);
        this.dialogService.text({ content: data.message });
      }



    }, (error) => {
      this.loadingService.loading$.next(false);
      this.dialogService.text({ content: error });
    });



  }


}
