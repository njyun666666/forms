import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { MenuTypeService } from '../../../@core/services/menu/menu-type.service';
import { MenuTypeAddDialogComponent } from './dialog/menu-type-add-dialog/menu-type-add-dialog.component';
import { MenuTypeUpdateDialogComponent } from './dialog/menu-type-update-dialog/menu-type-update-dialog.component';

@Component({
  selector: 'ngx-menu-type',
  templateUrl: './menu-type.component.html',
  styleUrls: ['./menu-type.component.scss']
})
export class MenuTypeComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    public dialog: MatDialog,
    private menuTypeService: MenuTypeService
  ) { }

  Data = new FormGroup({
    typeName: new FormControl('', [Validators.required]),
    status: new FormControl('1'),
  });
  MenuType: any = [];




  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtColumn: Array<DataTables.ColumnSettings> = [
    { title: '欄位種類ID', data: 'typeID' },
    { title: '欄位種類名', data: 'typeName' },
    { title: '狀態', data: 'status' },
  ];

  ngOnInit(): void {

    this.dtOptions = {
      searching: false,
      pageLength: 100,
      data: [],
      dom: '<"top" >rt  <"bottom"fip>  <"clear">',
      columns: this.dtColumn,
      rowCallback: (row: any, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.openUpdateDialog(row.cells[0].innerText);
        });
        return row;
      },
      language: {
        url: 'assets/packages/datatables/i18n/zh-tw.json'
      }
    };



    this.getMenuType();

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    // this.menuDTTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();

    // this.reDraw(this.MenuType);
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

  openAddDialog() {
    const dialogRef = this.dialog.open(MenuTypeAddDialogComponent, {
      data: { Data: this.Data, MenuType: this.MenuType }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(this.Data.value);
      this.getMenuType();
    });
  }

  openUpdateDialog(ID: number) {
    const dialogRef = this.dialog.open(MenuTypeUpdateDialogComponent, {
      data: { ID: ID, MenuType: this.MenuType }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMenuType();
    });
  }

  getMenuType() {
    this.menuTypeService.getMenuType().subscribe(x => {
      this.MenuType = x.data;
      const MenuListForShow = this.MenuListForShow_Get(this.MenuType);
      this.rerender(MenuListForShow);
      // console.log(x);
    });
  }

  MenuListForShow_Get(list: any[]) {
    const clonelist = _.cloneDeep(list);
    clonelist.forEach(x => {
      x.status = x.status === 1 ? '開啟' : '關閉';
    });
    return clonelist;
  }
}

