import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { OrgDeptInfo } from '../../../@core/models/organization/org-dept-info';
import { OrganizationService } from '../../../@core/services/organization.service';
import { OrgAddDeptComponent } from '../org-add-dept/org-add-dept.component';

@Component({
  selector: 'ngx-org-dept',
  templateUrl: './org-dept.component.html',
  styleUrls: ['./org-dept.component.scss']
})
export class OrgDeptComponent implements OnInit, OnDestroy, AfterViewInit {

  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtColumn: Array<DataTables.ColumnSettings> = [
    { title: '部門名稱', data: 'deptName', className: 'text-center' },
    { title: '上層部門', data: 'parentDeptName', className: 'text-center' },
    { title: '部門層級', data: 'levelName', className: 'text-center' },
    // { title: '排序', data: 'sort' },
    { title: '狀態', data: 'status', className: 'text-center', render: (data) => data === 1 ? '<span class="badge bg-primary">啟用</span>' : '<span class="badge bg-danger">停用</span>' },
  ];

  deptList: OrgDeptInfo[];


  constructor(
    private orgService: OrganizationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {



    this.dtOptions = {
      data: [],
      pageLength: 1000,
      order: [[0, 'asc']],
      columns: this.dtColumn,
      searching: false,
      dom: '', //<"top" >rt  <"bottom"fip>  <"clear">
      rowCallback: (row: any, data: any[] | Object, index: number) => {

        $(row).off('click').on('click', () => {
          // console.log(row);
          // console.log(data);
          this.openAddDept(data["deptID"]);
        });
        return row;
      }
    };


    this.getDeptList();

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


  getDeptList() {
    this.orgService.getDeptList().subscribe((result) => {
      this.rerender(result.data);
    });
  }

  openAddDept(deptID?, parentDept?) {
    // console.log(deptID);

    const dialogRef = this.dialog.open(OrgAddDeptComponent, {
      width: '500px',
      data: { deptID, parentDept }
    });


    dialogRef.afterClosed()
      .subscribe(result => {
        // console.log('The dialog was closed', result);
        if (result !== undefined && result.code === 1) {
          this.getDeptList();
        }
      });

  }


}
