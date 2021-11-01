import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { OrgTitle, OrgTitleGetModel } from '../../../@core/models/organization/org-title';
import { OrganizationService } from '../../../@core/services/organization.service';
import { OrgTitleFormComponent } from './org-title-form/org-title-form.component';

@Component({
  selector: 'ngx-org-title',
  templateUrl: './org-title.component.html',
  styleUrls: ['./org-title.component.scss']
})
export class OrgTitleComponent implements OnInit, OnDestroy, AfterViewInit {

  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtColumn: Array<DataTables.ColumnSettings> = [
    { title: '職稱', data: 'title', className: 'text-center' },
    { title: '職級', data: 'level', className: 'text-center' },
    { title: '狀態', data: 'status', className: 'text-center', render: (data) => data === 1 ? '<span class="badge bg-primary">啟用</span>' : '<span class="badge bg-danger">停用</span>' },
  ];

  levelList: OrgTitle[];

  constructor(
    private orgService: OrganizationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {


    this.dtOptions = {
      data: [],
      pageLength: 1000,
      order: [[1, 'desc']],
      columns: this.dtColumn,
      searching: false,
      dom: '', //<"top" >rt  <"bottom"fip>  <"clear">
      rowCallback: (row: any, data: any[] | Object, index: number) => {

        $(row).off('click').on('click', () => {
          // console.log(row);
          // console.log(data);
          this.openForm(data);
        });
        return row;
      }
    };


    this.getList();


  }




  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();

    // this.reDraw(this.MenuList);
  }


  rerender(list: any[]): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // console.log('rerender');
      // Destroy the table first
      // dtInstance.destroy();

      dtInstance.clear();
      dtInstance.rows.add(list).draw();

      // Call the dtTrigger to rerender again
      // this.dtTrigger.next();
    });
  }


  getList() {
    const para: OrgTitleGetModel = {
      status: null
    };
    this.orgService.getTitleList(para).subscribe((result) => {
      this.rerender(result.data);
    });
  }



  openForm(deptLevel?) {
    const dialogRef = this.dialog.open(OrgTitleFormComponent, {
      width: '500px',
      data: deptLevel
    });


    dialogRef.afterClosed()
      .subscribe(result => {
        // console.log('The dialog was closed', result);

        if (result !== undefined && result.code === 1) {

          this.getList();
        }
      });

  }



}
