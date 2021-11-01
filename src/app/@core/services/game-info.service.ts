import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { GameInfoGetAuthModel, GameInfoModel } from '../models/game-info.model';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GameInfoService {

  constructor(
    private apiService: ApiService
  ) { }

  /**
   * 取得遊戲清單
   *
   * @returns
   * @memberof GameInfoService
   */
  getGameInfo() {
    const url = 'Game/GameInfo_Get';
    return this.apiService.post(url);
  }
  /**
   * 依MenuID取得有權限的遊戲清單
   *
   * @param {GameInfoGetAuthModel} para
   * @returns
   * @memberof GameInfoService
   */
  getGameInfoByAuth(para: GameInfoGetAuthModel) {
    const url = 'Game/GameInfo_GetByAuth';
    return this.apiService.post(url, para);
  }
  /**
   * 新增/修改遊戲
   *
   * @param {GameInfoModel} para
   * @returns
   * @memberof GameInfoService
   */
  addGameInfo(para: GameInfoModel) {
    const url = 'Game/AddAppInfo';
    return this.apiService.post(url, para);
  }


}
