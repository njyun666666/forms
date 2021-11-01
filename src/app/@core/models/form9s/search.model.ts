import { OrgPickerAccountInfo } from "../organization/org-account-info";

export interface SearchModel {
    formClass: string;
    startDate: Date;
    endDate: Date;
    serial: string;
    applicantsName: string;
    applicants: OrgPickerAccountInfo[];
}
