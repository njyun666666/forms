export interface OrgAccountInfo {
    uid: string;
    name?: string;
    email?: string;
    employeeID?: string;
    status?: number;
    struct?: OrgAccountStruct[];
}

export interface OrgAccountStruct {
    uid: string;
    deptID?: string;
    deptName?: string;
    main?: number;
    titleID?: number;
    title?: string;
    signApprover?: number;
    agent?: string;
    agentName?: string;
    companyType?: string;
    companyTypeName?: string;
    status?: number;
}


export interface OrgAccountListGetModel {
    name?: string;
    employeeID?: string;
    email?: string;
    status?: number;
}


export interface OrgAccountInfoStruct {
    uid: string;
    name?: string;
    email?: string;
    employeeID?: string;
    status?: number;
    titleID?: number;
    title?: string;
    signApprover?: number;
    companyType?: string;
    companyTypeName?: string;
    deptID?: string;
    deptName?: string;


}



export interface OrgPickerAccountInfoGet {
    onlyDeptUser: boolean;
    whichDeptUser: string[];
}


export interface OrgPickerAccountInfo {
    uid: string;
    name?: string;
    employeeID?: string;
    deptID?: string;
    deptName?: string;
    main?: number;
    checked?: boolean;
}
