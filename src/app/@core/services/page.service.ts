import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { environment } from './../../../environments/environment';
import { NbMenuItem } from '@nebular/theme';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  menuLoading$ = new BehaviorSubject<boolean>(true);
  // menuLoading = true;

  constructor(
    private apiService: ApiService
  ) { }


  getMenu(): Observable<ResponseModel<any>> {
    const url = 'Menu/App_Permission_Get';
    return this.apiService.post(url);
  }




}
