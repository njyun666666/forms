import { SearchService } from './../../@core/services/search/search.service';
import { environment } from 'environments/environment';
import { Form9sService } from 'app/@core/services/form9s/form9s.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormsViewModel } from 'app/@core/models/form9s/form/forms.viewmodel';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormInfoModel } from 'app/@core/models/form9s/form-info.model';
import * as dayjs from 'dayjs';
import { OrgUserDeptModel } from 'app/@core/models/organization/org-user-dept-model';

@Component({
  selector: 'ngx-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {

  debug: boolean = !environment.production;
  isSubmit: boolean = false;


  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {
    pageLength: 30,
    order: [[3, 'asc']],
    searching: false,
    dom: '<"top" >rt  <"bottom"fip>  <"clear">',
    scrollX: true,
    language: {
      url: 'assets/packages/datatables/i18n/zh-tw.json'
    }
  };


  form: FormGroup = this.fb.group({
    formClass: [[]],
    startDate: [],
    endDate: [],
    serial: [],
    applicantsName: [],
    applicants: this.fb.array([])
  });

  formClassList: FormsViewModel[] = [];

  list: FormInfoModel[] = [];




  constructor(
    private fb: FormBuilder,
    private form9sService: Form9sService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {

    this.form9sService.getForms().subscribe((data) => {
      this.formClassList = data;
    });



    // 申請時間 設定結束時間不能早於開始時間
    this.form.get('startDate').valueChanges.subscribe((startDate) => {

      const endDate = this.form.get('endDate');

      if (dayjs(startDate).isValid() && dayjs(endDate.value).isValid()
        && dayjs(startDate).isAfter(dayjs(endDate.value))) {

        endDate.setValue(startDate);

      }

    });

  }




  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  setApplicants(data: OrgUserDeptModel[]) {
    // console.log(data);

    if (data) {
      const names = data.map(x => x.name).join(', ');
      this.form.get('applicantsName').setValue(names);
    } else {
      this.form.get('applicantsName').setValue('');

    }

  }

  onSubmit(form: FormGroup) {
    // console.log(form.value);
    this.isSubmit = true;


    this.searchService.formInfoList(form.value).subscribe((data) => {
      this.list = data;
      this.rerender();
      this.isSubmit = false;
    });

  }




  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();

      // dtInstance.clear();
      // dtInstance.rows.add(list).draw();

      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }




}
