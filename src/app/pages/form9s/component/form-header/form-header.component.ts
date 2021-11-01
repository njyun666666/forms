import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Form9sService } from '../../../../@core/services/form9s/form9s.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormSettingModel } from '../../../../@core/models/form9s/form/form-setting.model';
import { FormBaseDataModel } from 'app/@core/models/form9s/form/form-base-data.model';
import { FormListModel } from 'app/@core/models/form9s/form/form-list.model';
import { FlowchartDialogComponent } from 'app/pages/flowchart/flowchart-dialog/flowchart-dialog.component';
import { FlowchartModel } from 'app/@core/models/flowchart/flowchart.model';
import { SignFormModel } from 'app/@core/models/form9s/sign/sign-form.model';

@Component({
  selector: 'ngx-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit, OnChanges {


  @Input() in_formClass: string;


  formName: string;
  formSerial: string;
  formLevel: number;
  formLevelText: string;
  formApplicantName: string;
  formApplicantDate: string;

  formSetting = new FormSettingModel();

  baseData: FormBaseDataModel;
  formData: FormListModel;
  signForm: SignFormModel;



  // 'add' | 'sign' | 'info';
  path: string;


  constructor(
    private form9sService: Form9sService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.path = this.route.snapshot.url[0].path;


    this.baseData = this.route.snapshot.data['baseData'];
    this.formData = this.route.snapshot.data['formData'];
    this.signForm = this.route.snapshot.data['signForm'];



    this.formName = this.baseData.formName;

    if (this.formData !== undefined && this.formData !== null) {

      this.formSerial = this.formData.serial;
      this.formLevel = this.formData.levelID;
      this.formLevelText = this.baseData.levels.find(x => x.levelID === this.formLevel).level;
      this.formApplicantName = this.formData.applicantName;
      this.formApplicantDate = this.formData.applicantDate;
    }

    // this.form9sService.formSetting$.subscribe((item) => {
    //   this.formSetting = item;
    // });


  }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');

    // console.log(this.in_formClass);
  }


  openFlowchart(formClass: string, flowID?: string, stepID?: number) {


    const data: FlowchartModel = {
      formClass: formClass,
      flowID: flowID,
      stepID: stepID
    };

    // console.log(data);

    const dialogRef = this.dialog.open(FlowchartDialogComponent, {
      maxWidth: '90%',
      height: '90%',
      data: data
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });

  }


}
