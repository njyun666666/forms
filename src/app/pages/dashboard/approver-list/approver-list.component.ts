import { Form9sService } from './../../../@core/services/form9s/form9s.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ApproverInfoModel } from 'app/@core/models/form9s/approver-info.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-approver-list',
  templateUrl: './approver-list.component.html',
  styleUrls: ['./approver-list.component.scss']
})
export class ApproverListComponent implements OnInit, OnDestroy, AfterViewInit {

  isLoading: boolean = true;
  listSub: Subscription;


  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  list: ApproverInfoModel[] = [];

  constructor(
    private form9sService: Form9sService
  ) { }

  ngOnInit(): void {




    this.dtOptions = {
      pageLength: 10,
      order: [[0, 'desc'], [2, 'asc']],
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


    this.listSub = this.form9sService.getApproverList().subscribe((data) => {
      this.list = data;
      this.dtTrigger.next();
      this.isLoading = false;
    });



    // this.dtTrigger.next();

  }



  ngAfterViewInit(): void {

  }


  ngOnDestroy(): void {

    if (this.listSub) {
      this.listSub.unsubscribe();
    }

    this.dtTrigger.unsubscribe();
  }


}
