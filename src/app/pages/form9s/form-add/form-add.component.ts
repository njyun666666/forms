import { Subscription } from 'rxjs';
import { Form9sService } from './../../../@core/services/form9s/form9s.service';
import { Component, OnInit, OnDestroy, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormClassMapping } from '../../../@core/models/form9s/form-class-mapping';
import {  FormListModel } from 'app/@core/models/form9s/form/form-list.model';
import { FormBaseDataModel } from 'app/@core/models/form9s/form/form-base-data.model';

@Component({
  selector: 'ngx-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {


  formClass: string;
  componentOutlet;

  baseData: FormBaseDataModel;
  formData: FormListModel;

  routeSub: Subscription;

  fileGroupID: string;
  // fileGroupIDSub: Subscription;

  show_deleteDraftBtn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private form9sService: Form9sService,
    private cd: ChangeDetectorRef
  ) { }



  ngOnInit(): void {


    this.route.data.subscribe((data) => {
      // console.log(data);
      this.baseData = data['baseData'];
      this.formData = data['formData'];


      if (this.formData == null) {

        this.show_deleteDraftBtn = false;
        this.fileGroupID = this.baseData.fileGroupID;

      } else {
        // 草稿
        this.show_deleteDraftBtn = true;
        this.fileGroupID = this.formData.fileGroupID;

      }




      // this.route.snapshot.data['formData'];
    });




    this.routeSub = this.route.params.subscribe(params => {
      this.formClass = params['formClass'].toUpperCase();
      this.setForm(this.formClass);
    });

    // 取得目標表單
    // this.formClass = this.route.snapshot.paramMap.get('formClass').toUpperCase();

    // this.fileGroupIDSub = this.form9sService.fileGroupID$.subscribe((data) => {
    //   this.fileGroupID = data;
    // });

  }



  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    // this.fileGroupIDSub.unsubscribe();
  }


  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('form-add changes', changes);
  }


  /**
   * 設定表單元件
   * @param formClass
   */
  setForm(formClass: string) {

    if (FormClassMapping.has(formClass)) {

      this.componentOutlet = FormClassMapping.get(formClass);

    } else {
      this.router.navigate(['/form']);
    }

  }


  /**
   * 草稿
   */
  deleteDraft() {
    this.form9sService.deleteDraftBtn$.next();
  }
  /**
   * 草稿
   */
  draft() {
    this.form9sService.draftBtn$.next();
  }
  /**
    * 送出申請
    */
  applicant() {
    this.form9sService.applicantBtn$.next();
  }


}
