import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { OrgDeptLevel } from '../../../@core/models/organization/org-dept-level';
import { OrganizationService } from '../../../@core/services/organization.service';
import { OrgDeptLevelFormComponent } from './org-dept-level-form/org-dept-level-form.component';

@Component({
  selector: 'ngx-org-dept-level',
  templateUrl: './org-dept-level.component.html',
  styleUrls: ['./org-dept-level.component.scss']
})
export class OrgDeptLevelComponent implements OnInit, OnDestroy, AfterViewInit {

  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtColumn: Array<DataTables.ColumnSettings> = [
    { title: '部門層級', data: 'levelName', className: 'text-center' },
    { title: '層級', data: 'level', className: 'text-center' },
    { title: '狀態', data: 'status', className: 'text-center', render: (data) => data === 1 ? '<span class="badge bg-primary">啟用</span>' : '<span class="badge bg-danger">停用</span>' },
  ];

  levelList: OrgDeptLevel[];

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
          this.openAddDeptLevel(data);
        });
        return row;
      }
    };


    this.getDeptLevelList();


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


  getDeptLevelList() {
    this.orgService.getDeptLevelList().subscribe((result) => {
      this.rerender(result.data);
    });
  }



  openAddDeptLevel(deptLevel?) {
    const dialogRef = this.dialog.open(OrgDeptLevelFormComponent, {
      width: '500px',
      data: deptLevel
    });


    dialogRef.afterClosed()
      .subscribe(result => {
        // console.log('The dialog was closed', result);

        if (result !== undefined && result.code === 1) {

          this.getDeptLevelList();
        }
      });

  }




}
