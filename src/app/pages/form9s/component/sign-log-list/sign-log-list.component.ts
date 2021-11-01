import { Form9sService } from 'app/@core/services/form9s/form9s.service';
import { Component, Input, OnInit, ViewChild, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { SignLogViewModel } from 'app/@core/models/form9s/sign/sign-log-view.model';

@Component({
  selector: 'ngx-sign-log-list',
  templateUrl: './sign-log-list.component.html',
  styleUrls: ['./sign-log-list.component.scss']
})
export class SignLogListComponent implements OnInit, OnDestroy, OnChanges {


  @Input() in_formID: string;
  @Output() countEmitter = new EventEmitter<number>();


  isLoading = true;
  signLogListSub: Subscription;


  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {
    pageLength: 30,
    order: [[0, 'asc']],
    searching: false,
    dom: '<"top" >rt  <"bottom"fip>  <"clear">',
    // columnDefs: [
    //   { "width": "200px", "targets": 0 }
    // ],
    language: {
      url: 'assets/packages/datatables/i18n/zh-tw.json'
    }
  };


  list: SignLogViewModel[] = [];

  constructor(
    private form9sService: Form9sService
  ) { }

  ngOnInit(): void {



  }

  ngOnChanges(changes: SimpleChanges): void {

    this.signLogListSub = this.form9sService.signLogList({ formID: this.in_formID }).subscribe((data) => {
      this.list = data;
      this.dtTrigger.next();
      this.countEmitter.emit(data.length);
      // this.isLoading = false;
    });

  }



  ngOnDestroy(): void {

    if (this.signLogListSub !== undefined) {
      this.signLogListSub.unsubscribe;
    }

    this.dtTrigger.unsubscribe();
  }




}
