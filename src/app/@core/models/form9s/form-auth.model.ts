export interface FormAuthSettingReqeustModel {
    uid: string;
}

export interface FormAuthViewModel {
    typeName: string;
    children: FormSettingAuthViewModel[];
}


export interface FormSettingAuthViewModel {
    formClass: string;
    formName: string;
    auth: FormAuthStatusModel[];
}

export interface FormAuthStatusModel {
    authType: number;
    typeName: string;
    status: number;
}

export interface FormAuthEditModel {
    uid: string;
    formClass: string;
    authType: number;
    status: number;
}
