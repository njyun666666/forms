export interface OrgDeptInfo {
    deptID: string;
    deptName?: string;
    status?: number;
    deptLevelID?: number;
    levelName?: string;
    parentDept?: string;
    parentDeptName?: string;
    sort?: number;
    expand?: number;
}

export interface OrgPickerDeptInfo {
    deptID: string;
    deptName: string;
    checked?: boolean;
}

// export class OrgDeptInfoModel {

//     DeptID: string;
//     DeptName?: string;
//     Status?: number;
//     DeptLevelID?: number;
//     ParentDept?: string;
//     Checked?: boolean;

//     constructor(DeptID: string) {
//         this.DeptID = DeptID;
//         this.Checked = false;
//     }
// }
