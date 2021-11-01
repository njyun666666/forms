import { Injectable } from '@angular/core';
import { LoginInfoModel } from '../models/auth/login.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(): string {
    return window.localStorage['token'];
  }

  saveToken(token: string) {
    window.localStorage['token'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('token');
  }

  getInfo(): LoginInfoModel {
    try {
      const infoJsonString = window.localStorage['info'];
      return infoJsonString ? JSON.parse(atob(infoJsonString)) : null;
    } catch (error) { }

    return null;
  }

  saveInfo(infoJsonString: string) {
    window.localStorage['info'] = infoJsonString;
  }

  destroyInfo() {
    window.localStorage.removeItem('info');
  }


}
