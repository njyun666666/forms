import { SignResultType } from "app/@core/Enum/sign-result-type.enum";

export interface SignLogViewModel {
    stepName: string;
    approver: string;
    signOption: string;
    signResultID: SignResultType;
    signContent: string;
    signDate: Date;
}

export interface SignLogRequestModel {
    formID: string;
}
