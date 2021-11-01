import { SignResultType } from "app/@core/Enum/sign-result-type.enum";
import { NowStepApproverModel } from "./now-step-approver.model";

export interface FormInfoModel {
    levelID: number;
    levelNumber: number;
    level: string;
    formID: string;
    formName: string;
    serial: string;
    applicantDate: Date;
    applicantName: string;
    applicantDept: string;
    nowStepApproverList: NowStepApproverModel[];
    resultID: SignResultType;
    result: string;
}
