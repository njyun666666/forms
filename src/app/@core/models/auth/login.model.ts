export interface LoginModel {
  account: string;
  password: string;
}
export interface LoginViewModel {
  token: string;
  infoJsonString: string;
}
export interface LoginInfoModel {
  uid: string;
  name: string;
  photoURL: string;
  date: Date;
}
export interface ResetPwModel {
  account: string;
}

export interface ChangeUserModel {
  uid: string;
}