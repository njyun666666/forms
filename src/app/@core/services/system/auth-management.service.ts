import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthManagementService {

  constructor(
    private apiService: ApiService
  ) { }

  isAdmin() {
    const url = 'Auth/IsAdmin';
    return this.apiService.post(url);
  }
  getUserMenuAuthList(para) {
    const url = 'Auth/GetUserMenuAuthList';
    return this.apiService.post(url, para);
  }

  setUserMenuAuth(para) {
    const url = 'Auth/SetUserMenuAuth';
    return this.apiService.post(url, para);
  }



}
