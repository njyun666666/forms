import { Form9sService } from './../../../@core/services/form9s/form9s.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DraftListModel } from '../../../@core/models/form9s/draft.model';
import { Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'ngx-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.scss']
})
export class DraftListComponent implements OnInit, OnDestroy, AfterViewInit {

  isLoading: boolean = true;
  listSub: Subscription;

  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  list: DraftListModel[] = [];


  constructor(
    private form9sService: Form9sService
  ) { }

  ngOnInit(): void {



    this.dtOptions = {
      // data: [],
      pageLength: 10,
      order: [[1, 'asc']],
      // columns: this.dtColumn,
      searching: false,
      dom: '<"top" >rt  <"bottom"fip>  <"clear">',
      scrollX: true,
      language: {
        url: 'assets/packages/datatables/i18n/zh-tw.json'
      }
    };









    this.listSub = this.form9sService.getDraftList().subscribe((data) => {
      this.list = data;
      this.dtTrigger.next();
      this.isLoading = false;
      // this.rerender(data);
    });






  }




  ngOnDestroy(): void {

    if (this.listSub) {
      this.listSub.unsubscribe();
    }

    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    // this.dtTrigger.next();
  }


}
