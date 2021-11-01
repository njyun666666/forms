import { Form9sService } from './../../../@core/services/form9s/form9s.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ApplicantInfoModel } from 'app/@core/models/form9s/applicant-info-model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss']
})
export class ApplicantListComponent implements OnInit, OnDestroy, AfterViewInit {

  isLoading: boolean = true;
  listSub: Subscription;

  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  list: ApplicantInfoModel[] = [];


  constructor(
    private form9sService: Form9sService
  ) { }

  ngOnInit(): void {


    this.dtOptions = {
      pageLength: 10,
      order: [[0, 'desc'], [4, 'asc']],
      searching: false,
      dom: '<"top" >rt  <"bottom"fip>  <"clear">',
      columnDefs: [
        {
          "targets": [0],
          "visible": false,
          "searchable": false
        }
      ],
      scrollX: true,
      language: {
        url: 'assets/packages/datatables/i18n/zh-tw.json'
      }
    };



    this.listSub = this.form9sService.getApplicantFormList().subscribe((data) => {
      this.list = data;
      this.dtTrigger.next();
      this.isLoading = false;
    });


    // this.dtTrigger.next();

  }



  ngAfterViewInit(): void {
    // this.dtTrigger.next();
  }


  ngOnDestroy(): void {

    if (this.listSub) {
      this.listSub.unsubscribe();
    }

    this.dtTrigger.unsubscribe();
  }

}
