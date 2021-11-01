import { SignOptionType } from "app/@core/Enum/sign-option-type.enum";
import { SignResultType } from "app/@core/Enum/sign-result-type.enum";

export interface SignOptionModel {
    id: number;
    text: string;
    resultID: SignResultType;
    typeID: SignOptionType;
    sort: number;
    status: number;
    stepID: number;
    description: string;
}
export interface GetSignOptionModel {
    typeID: SignOptionType;
    stepID?: number;
    formID?: string;
}
