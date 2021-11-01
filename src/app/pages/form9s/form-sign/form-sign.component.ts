import { Form9sService } from 'app/@core/services/form9s/form9s.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignOptionType } from 'app/@core/Enum/sign-option-type.enum';
import { FormBaseDataModel } from 'app/@core/models/form9s/form/form-base-data.model';
import { FormListModel } from 'app/@core/models/form9s/form/form-list.model';
import { SignFormModel } from 'app/@core/models/form9s/sign/sign-form.model';
import { GetSignOptionModel, SignOptionModel } from 'app/@core/models/form9s/sign/sign-option.model';

@Component({
  selector: 'ngx-form-sign',
  templateUrl: './form-sign.component.html',
  styleUrls: ['./form-sign.component.scss']
})
export class FormSignComponent implements OnInit {

  fileGroupID: string;
  baseData: FormBaseDataModel;
  formData: FormListModel;
  signForm: SignFormModel;


  signOptionModel: GetSignOptionModel = {
    typeID: SignOptionType.sign
  };


  constructor(
    private route: ActivatedRoute,
    private form9sService: Form9sService
  ) { }

  ngOnInit(): void {
    this.baseData = this.route.snapshot.data['baseData'];
    this.formData = this.route.snapshot.data['formData'];
    this.signForm = this.route.snapshot.data['signForm'];

    this.fileGroupID = this.signForm.fileGroupID;

    this.signOptionModel.formID = this.formData.formID;
    this.signOptionModel.stepID = this.signForm.stepID;

  }

  sign(option: SignOptionModel) {
    // console.log(option);
    this.form9sService.signBtn$.next(option);
  }

}
