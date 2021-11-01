import { GameInfoService } from './../../../@core/services/game-info.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GameInfoModel } from '../../../@core/models/game-info.model';
import { MatDialog } from '@angular/material/dialog';
import { GameAddDialogComponent } from './game-add-dialog/game-add-dialog.component';
import * as dayjs from 'dayjs';

@Component({
  selector: 'ngx-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnDestroy, AfterViewInit {

  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtColumn: Array<DataTables.ColumnSettings> = [
    { title: 'AppID', data: 'appID', className: 'text-center' },
    { title: '遊戲名稱', data: 'appName', className: 'text-center' },
    { title: '地區', data: 'area', className: 'text-center' },
    { title: '時區', data: 'timeZone', className: 'text-center' },
    { title: '建立時間', data: 'createDate', className: 'text-center', render: (data) => data ? dayjs(data).format('YYYY/MM/DD HH:mm:ss') : '' },
    { title: '修改時間', data: 'updateDate', className: 'text-center', render: (data) => data ? dayjs(data).format('YYYY/MM/DD HH:mm:ss') : '' },
    { title: '狀態', data: 'status', className: 'text-center', render: (data) => data === 1 ? '<span class="badge bg-primary">啟用</span>' : '<span class="badge bg-danger">停用</span>' },
  ];

  levelList: GameInfoModel[];

  constructor(
    private gameInfoService: GameInfoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {


    this.dtOptions = {
      data: [],
      pageLength: 1000,
      order: [[0, 'asc']],
      columns: this.dtColumn,
      searching: false,
      dom: '', // <"top" >rt  <"bottom"fip>  <"clear">
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
    // const para: OrgTitleGetModel = {
    //   status: null
    // };
    this.gameInfoService.getGameInfo().subscribe((result) => {
      this.rerender(result.data);
    });
  }



  openForm(data?) {
    const dialogRef = this.dialog.open(GameAddDialogComponent, {
      width: '500px',
      data: data
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
