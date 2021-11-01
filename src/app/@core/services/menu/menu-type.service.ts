import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { ApiService } from '../api.service';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../../models/response.model';
@Injectable({
  providedIn: 'root'
})
export class MenuTypeService {

  constructor(
    private apiService: ApiService
  ) { }


  getMenuType(): Observable<ResponseModel<any>> {
    const url = 'Menu/Menu_Type_Get';
    return this.apiService.post(url);
  }
  AddMenuType(param:any): Observable<ResponseModel<any>> {
    const url = 'Menu/Menu_Type_Add';
    return this.apiService.post(url,param);
  }
  UpdateMenuType(param:any): Observable<ResponseModel<any>> {
    const url = 'Menu/Menu_Type_Update';
    return this.apiService.post(url,param);
  }

}
