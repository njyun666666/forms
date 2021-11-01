import { MenuTypeModel } from './../../../@core/models/menu/menu-type.model';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuAddDialogComponent } from './dialog/menu-add-dialog/menu-add-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuListService } from '../../../@core/services/menu/menu-list.service';
import { MenuTypeService } from '../../../@core/services/menu/menu-type.service';
import { KeyValue } from '@angular/common';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MenuUpdateDialogComponent } from './dialog/menu-update-dialog/menu-update-dialog.component';
import * as _ from "lodash";
import { MenuListModel } from '../../../@core/models/menu/menu-list.model';

@Component({
  moduleId: module.id,
  selector: 'ngx-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})

export class MenuListComponent implements OnDestroy, OnInit, AfterViewInit {

  Data = new FormGroup({
    menuName: new FormControl('', [Validators.required]),
    mainMenu: new FormControl('0'),
    url: new FormControl('', [Validators.required]),
    icon: new FormControl(''),
    sort: new FormControl('0'),
    status: new FormControl('1'),
    type: new FormControl('1'),
  });

  MenuList: Array<MenuListModel> = [];
  MenuType: Array<MenuTypeModel> = [];

  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtColumn: Array<DataTables.ColumnSettings> = [
    { title: '欄位ID', data: 'menuID' },
    { title: '欄位名', data: 'menuName' },
    { title: '上層', data: 'mainMenu' },
    { title: 'Url', data: 'url' },
    { title: '縮圖', data: 'icon', render: (data) => '<i class="fas ' + data + '"></i>' },
    { title: '狀態', data: 'status' },
    { title: '種類', data: 'type' },
    { title: '排序', data: 'sort' },
  ];



  constructor(
    public dialog: MatDialog,
    private menuListService: MenuListService,
    private menuTypeService: MenuTypeService
  ) { }



  ngOnInit(): void {


    this.dtOptions = {
      searching: false,
      data: [],
      pageLength: 50,
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

    this.getMenuType().subscribe(x => {
      this.MenuType = x.data;
      this.getMenu();
    });
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    // this.menuDTTrigger.unsubscribe();
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

  getMenu() {
    this.menuListService.getMenuList().subscribe(x => {
      this.MenuList = x.data;
      const MenuListForShow = this.MenuListForShow_Get(this.MenuList);
      this.rerender(MenuListForShow);
      // console.log(x);
    });
  }

  getMenuType() {
    return this.menuTypeService.getMenuType();
  }

  MenuListForShow_Get(list: any[]) {
    const clonelist = _.cloneDeep(list);
    clonelist.forEach(x => {
      if (x.mainMenu === 0)
        x.mainMenu = '無';
      else
        x.mainMenu = clonelist.find(y => y.menuID === x.mainMenu).menuName;
      x.status = x.status === 1 ? '開啟' : '關閉';
      x.type = this.MenuType.find(y => y.typeID === x.type).typeName;
    });
    return clonelist;
  }

  clearDT() {
    this.rerender([]);
  }




  openAddDialog() {
    const dialogRef = this.dialog.open(MenuAddDialogComponent, {
      minWidth: 350,
      data: {
        Data: this.Data,
        MenuType: this.MenuType,
        MenuList: this.MenuList.filter(x => x.mainMenu === 0)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(this.Data.value);
      this.getMenu();
    });
  }
  openUpdateDialog(ID: number) {
    const dialogRef = this.dialog.open(MenuUpdateDialogComponent, {
      minWidth: 350,
      data: {
        ID: ID,
        MenuType: this.MenuType,
        MenuList: this.MenuList
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMenu();
    });
  }
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

}
