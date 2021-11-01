import { NowStepApproverModel } from "./now-step-approver.model";

export interface ApproverInfoModel {
    id: number;
    levelID: number;
    levelNumber: number;
    level: string;
    arrivalDate: Date;
    formID: string;
    formName: string;
    serial: string;
    applicantName: string;
    applicantDept: string;
    nowStepApproverList: NowStepApproverModel[];
}
