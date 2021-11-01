import { SignResultType } from "app/@core/Enum/sign-result-type.enum";
import { StepTypeEnum } from "app/@core/Enum/step-type.enum";
import { FlowchartNodeTypes } from "app/@core/types/flowchart-node-types";

export interface FlowchartModel {
    formClass?: string;
    flowID?: string;
    stepID?: number;
}
export interface FlowchartViewModel {
    step: FlowchartStepModel[];
    line: FlowchartLineModel[];
}
export interface FlowchartStepModel {
    stepID: number;
    stepType: StepTypeEnum;
    stepName: string;
    nodeType: FlowchartNodeTypes;
}
export interface FlowchartLineModel {
    startStepID: number;
    endStepID: number;
    setting: string;
    resultID: SignResultType;
    flowchartPath: string;
    flowchartDirections: string;
}
