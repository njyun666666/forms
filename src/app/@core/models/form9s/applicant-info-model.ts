import { NowStepApproverModel } from "./now-step-approver.model";

export interface ApplicantInfoModel {
    levelID: number;
    levelNumber: number;
    level: string;
    formID: string;
    formName: string;
    serial: string;
    applicantDate: Date;
    nowStepApproverList: NowStepApproverModel[];
}
