import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { OrgAccountInfoStruct, OrgAccountListGetModel, OrgAccountStruct } from '../../../@core/models/organization/org-account-info';
import { OrganizationService } from '../../../@core/services/organization.service';
import { OrgAddUserComponent } from '../org-add-user/org-add-user.component';
import { OrgCompanyType } from '../../../@core/models/organization/org-company-type';
import { OrgTitle, OrgTitleGetModel } from '../../../@core/models/organization/org-title';

@Component({
  selector: 'ngx-org-user',
  templateUrl: './org-user.component.html',
  styleUrls: ['./org-user.component.scss']
})
export class OrgUserComponent implements OnInit, OnDestroy, AfterViewInit {


  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtColumn: Array<DataTables.ColumnSettings> = [
    { title: '員工編號', data: 'employeeID', className: 'text-center' },
    { title: '姓名', data: 'name', className: 'text-center' },
    { title: 'Email', data: 'email', className: 'text-center' },
    { title: '主要部門', data: 'deptName', className: 'text-center' },
    { title: '職稱', data: 'title', className: 'text-center' },
    { title: '簽核權', data: 'signApprover', className: 'text-center', render: (data) => data === 1 ? '有' : '' },
    { title: '公司別', data: 'companyTypeName', className: 'text-center' },
    { title: '狀態', data: 'status', className: 'text-center', render: (data) => data === 1 ? '<span class="badge bg-primary">啟用</span>' : '<span class="badge bg-danger">停用</span>' },
  ];

  list: OrgAccountStruct[];


  queryForm: FormGroup;
  queryFormTarget: FormGroup;



  constructor(
    private orgService: OrganizationService,
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {


    this.dtOptions = {
      data: [],
      pageLength: 50,
      order: [[0, 'asc']],
      columns: this.dtColumn,
      searching: false,
      dom: '<"top" >rt  <"bottom"fip>  <"clear">',
      language: {
        url: 'assets/packages/datatables/i18n/zh-tw.json'
      },
      rowCallback: (row: any, data: any[] | Object, index: number) => {

        $(row).off('click').on('click', () => {
          // console.log(row);
          // console.log(data);
          this.goUserEditPage(data);
        });
        return row;
      }
    };






    this.queryForm = this.fb.group({
      employeeID: this.fb.control(null),
      name: this.fb.control(null),
      email: this.fb.control(null),
      status: this.fb.control(null),
    });

    this.queryFormTarget = this.queryForm;


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

    this.orgService.orgAccountList(this.queryFormTarget.value).subscribe((result) => {
      this.rerender(result.data);
    });
  }


  goUserEditPage(data) {

    const urlParams = {
      uid: data.uid
    };

    this.router.navigate(['/organization/useredit/'], { queryParams: urlParams });

  }


  openForm() {
    const dialogRef = this.dialog.open(OrgAddUserComponent, {
      width: '700px',
      data: {}
    });


    dialogRef.afterClosed()
      .subscribe(result => {
        // console.log('The dialog was closed', result);

        if (result !== undefined && result.code === 1) {

          this.getList();
        }
      });

  }

  querysubmit() {

    this.queryFormTarget = this.queryForm;
    this.getList();

  }

}
