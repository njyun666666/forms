export interface OrgPickerTypeModel {
    type: 'dept' | 'user';
    countType: 'single' | 'multiple';
    onlyDeptUser?: boolean;
    whichDeptUser?: string[];
}
