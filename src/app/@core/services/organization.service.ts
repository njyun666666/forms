import { environment } from './../../../environments/environment';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { OrgDeptLevel } from '../models/organization/org-dept-level';
import { Subject } from 'rxjs';
import { OrgDeptInfo } from '../models/organization/org-dept-info';
import { OrgCompanyType } from '../models/organization/org-company-type';
import { OrgTitle, OrgTitleGetModel } from '../models/organization/org-title';
import { OrgAccountListGetModel, OrgPickerAccountInfoGet } from '../models/organization/org-account-info';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {


  constructor(
    private apiService: ApiService
  ) {
  }

  /**
   *取得人員清單
   * @memberof OrganizationService
   */
  orgAccountList(para?: OrgAccountListGetModel) {
    const url = 'Organization/OrgAccountList';
    return this.apiService.post(url, para);
  }
  /**
   *取得組織樹
   * @memberof OrganizationService
   */
  getOrgTree() {
    const url = 'Organization/GetOrgNode';
    return this.apiService.post(url);
  }

  /**
  * 組織選取器 取得部門清單
  * @memberof OrganizationService
  */
  orgPickerGetDeptList() {
    const url = 'Organization/OrgPickerGetDeptInfoList';
    return this.apiService.post(url);
  }
  /**
  * 組織選取器 取得人員清單
  * @memberof OrganizationService
  */
  orgPickerGetUserList(para: OrgPickerAccountInfoGet) {
    const url = 'Organization/OrgPickerGetUserInfoList';
    return this.apiService.post(url, para);
  }

  /**
  *取得部門層級
  * @memberof OrganizationService
  */
  getDeptLevelList(status?: number) {
    const para = { status };
    const url = 'Organization/GetDeptLevel';
    return this.apiService.post(url, para);
  }
  /**
  *取得部門層級
  * @memberof OrganizationService
  */
  addDeptLevel(para) {
    const url = 'Organization/AddDeptLevel';
    return this.apiService.post(url, para);
  }

  /**
  *取得公司別清單
  * @memberof OrganizationService
  */
  getCompanyTypeList() {
    const url = 'Organization/GetCompanyTypeList';
    return this.apiService.post(url);
  }

  /**
  *取得職稱清單
  * @memberof OrganizationService
  */
  getTitleList(para?: OrgTitleGetModel) {
    const url = 'Organization/GetTitleList';
    return this.apiService.post(url, para);
  }

  /**
  *新增/修改職稱
  * @memberof OrganizationService
  */
  addTitle(para) {
    const url = 'Organization/AddTitle';
    return this.apiService.post(url, para);
  }


  /**
  *取得部門清單
  * @memberof OrganizationService
  */
  getDeptList() {
    const url = 'Organization/GetDeptList';
    return this.apiService.post(url);
  }

  /**
   *取得部門資訊
   * @memberof OrganizationService
   */
  getDeptInfo(para) {
    const url = 'Organization/GetDeptInfoStruct';
    return this.apiService.post(url, para);
  }


  /**
   *新增部門資訊
   * @memberof OrganizationService
   */
  addDept(para) {
    const url = 'Organization/AddDeptInfoStruct';
    return this.apiService.post(url, para);
  }

  /**
   *修改部門資訊
   * @memberof OrganizationService
   */
  editDept(para) {
    const url = environment.apiUrl + '/api';
    return this.apiService.post(url, para);
  }


  /**
 *新增部門資訊
 * @memberof OrganizationService
 */
  addUser(para) {
    const url = 'Organization/AddUserInfoStruct';
    return this.apiService.post(url, para);
  }


  /**
   *取得人員資訊、結構
   * @memberof OrganizationService
   */
  getUserInfoStruct(para) {
    const url = 'Organization/GetUserInfoStruct';
    return this.apiService.post(url, para);
  }

  editUserInfo(para) {
    const url = 'Organization/EditUserInfo';
    return this.apiService.post(url, para);
  }

  getUserList() {

  }

  addUserStruct(para) {
    const url = 'Organization/AddUserStruct';
    return this.apiService.post(url, para);
  }

}
