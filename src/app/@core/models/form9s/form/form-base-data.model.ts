import { NowStepApproverModel } from './../now-step-approver.model';
import { StepTypeEnum } from "app/@core/Enum/step-type.enum";
import { FormLevelModel } from "./form-level.model";
import { SignResultType } from 'app/@core/Enum/sign-result-type.enum';

export interface FormBaseDataModel {
    formClass: string;
    formName: string;
    formID: string;
    signID: number;
    stepID: number;
    stepType: StepTypeEnum;
    stepTypeString: string;
    applicant: ApplicantModel[];
    levels: FormLevelModel[];
    fileGroupID: string;
    nowStepApproverList: NowStepApproverModel[];
    resultID: SignResultType;
    result: string;
}
export interface ApplicantModel {
    applicantID: string;
    applicantName: string;
    depts: ApplicantDeptModel[];
}
export interface ApplicantDeptModel {
    applicantDeptID: string;
    applicantDept: string;
}
export interface BaseDataRequestModel {
    formClass?: string;
    formID?: string;
    stepType?: number;
    signID?: number;
}
