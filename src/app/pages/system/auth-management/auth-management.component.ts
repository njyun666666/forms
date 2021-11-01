import { map } from 'rxjs/operators';
import { AuthManagementService } from './../../../@core/services/system/auth-management.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GameInfoModel } from '../../../@core/models/game-info.model';
import { GameInfoService } from '../../../@core/services/game-info.service';
import { MenuAuthListModel } from '../../../@core/models/auth-management/menu-auth-list-model';
import { ResponseCode } from '../../../@core/Enum/response-code.enum';

import { ToastrService } from 'app/@core/services/toastr.service';

@Component({
  selector: 'ngx-auth-management',
  templateUrl: './auth-management.component.html',
  styleUrls: ['./auth-management.component.scss']
})
export class AuthManagementComponent implements OnInit {

  appList: GameInfoModel[];
  menuList: MenuAuthListModel[];

  form: FormGroup;
  targetMenuForm: FormGroup;

  isSubmit: boolean = false;

  isAdmin: boolean = false;


  get uid(): FormControl {
    return this.form.get('uid') as FormControl;
  }
  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get menuListArray(): FormControl {
    return this.form.get('menuList') as FormControl;
  }
  get menuListAllArray(): FormControl {
    return this.form.get('menuListAll') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private gameInfoService: GameInfoService,
    private authManService: AuthManagementService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      uid: this.fb.control(null, [Validators.required]),
      name: this.fb.control(null),
      appID: this.fb.control(null, [Validators.required]),
      menuList: this.fb.control([]),
      menuListAll: this.fb.control([])
    });

    this.targetMenuForm = this.fb.group({
      uid: this.fb.control(null, [Validators.required]),
      appID: this.fb.control(null, [Validators.required])
    });

    this.gameInfoService.getGameInfo().subscribe((result) => {
      this.appList = result.data;
    });


    this.authManService.isAdmin().subscribe((result) => {
      this.isAdmin = result.data;
    });

  }


  changeUser($event) {
    this.targetMenuForm.get('uid').setValue($event);
    this.getMenuAuthList();
  }

  changeApp($event) {
    this.targetMenuForm.get('appID').setValue($event);
    this.getMenuAuthList();
  }


  getMenuAuthList() {

    if (!this.targetMenuForm.valid) {
      return false;
    }

    this.authManService.getUserMenuAuthList(this.targetMenuForm.value).subscribe((result) => {

      this.menuList = result.data.map(x => {
        x.indeterminate = false;
        return x;
      });


      // 取得最上層
      this.menuList.filter(x => x.mainMenu === 0).forEach(x => {

        // 子選單
        const tempList = this.menuList.filter(i => i.mainMenu === x.menuID);
        const trueList = tempList.filter(i => i.status);

        if (trueList.length > 0 && trueList.length < tempList.length) {
          x.indeterminate = true;
        }


      });


      this.menuListArray.setValue(null);

      // result.data.forEach(x => {

      //   const obj = this.fb.group({
      //     menuID: this.fb.control(x.menuID),
      //     menuName: this.fb.control(x.menuName),
      //     status: this.fb.control(x.status)
      //   });

      //   this.menuListArray.push(obj);

      // });

      // console.log(this.menuListArray);

    });

  }


  updateAllComplete($event, item: MenuAuthListModel) {
    // console.log($event, item);


    // 取得同層選單
    const tempList = this.menuList.filter(i => i.mainMenu === item.mainMenu);
    const trueList = tempList.filter(i => i.status);

    const mainMenu = this.menuList.find(x => x.menuID === item.mainMenu);

    if (tempList.length === trueList.length) {

      mainMenu.status = true;
      mainMenu.indeterminate = false;

    } else if (trueList.length > 0) {

      mainMenu.status = false;
      mainMenu.indeterminate = true;

    } else {

      mainMenu.status = false;
      mainMenu.indeterminate = false;
    }



  }


  setAll($event, item: MenuAuthListModel) {
    // console.log($event, item);
    item.indeterminate = false;

    this.menuList.filter(x => x.mainMenu === item.menuID)
      .forEach(x => {
        x.indeterminate = false;
        x.status = $event;
      });

  }



  onSubmit() {

    if (this.isSubmit) { return false; }

    const allMenu = this.menuList.map(x => x.menuID);
    const targetMenu = this.menuList.filter(x => x.status || x.indeterminate).map(x => x.menuID);

    this.menuListArray.setValue(targetMenu);
    this.menuListAllArray.setValue(allMenu);

    this.authManService.setUserMenuAuth(this.form.value).subscribe(
      (data) => {
        if (data.code === ResponseCode.success) {

          this.toastrService.show(null, '修改成功', { status: 'success' });

        } else {

          this.toastrService.show(null, data.message, { status: 'danger' });

        }



        this.isSubmit = false;
      },

      (error) => {
        this.isSubmit = false;
      }
    );

  }





}
