import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { NbMenuItem } from '@nebular/theme';
import { ApiService } from '../api.service';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../../models/response.model';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MenuListService {

  constructor(
    private apiService: ApiService
  ) { }


  getMenu(): Observable<NbMenuItem> {
    const url = 'Menu/App_Permission_Get';
    return this.apiService.post(url);
  }

  getMenuList(): Observable<ResponseModel<any>> {
    const url = 'Menu/Menu_Get';
    return this.apiService.post(url);
  }
  AddMenuList(param:any): Observable<ResponseModel<any>> {
    const url = 'Menu/Menu_Add';
    return this.apiService.post(url,param);
  }
  UpdateMenuList(param:any): Observable<ResponseModel<any>> {
    const url = 'Menu/Menu_Update';
    return this.apiService.post(url,param);
  }

}
