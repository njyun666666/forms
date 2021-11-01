import { FieldName } from "../../field-name";
import { FormListModel } from "../form/form-list.model";

export interface SRModel extends FormListModel {
    type: string;
    other: string;
    subject: string;
    content: string;
    onlineDate: Date;
    // havePhone: number;
    expectedDate: Date;
    taskOwnerList: SRTaskOwnerModel[];
}

export interface SRTaskOwnerModel {
    id?: number;
    uid: string;
    name: string;
    workDay: number;
    testDay: number;
    estStartDate: Date | string;
    estEndDate: Date | string;
    realStartDate: Date | string;
}

export const SRFieldNameJson: FieldName = {
    other: '專案屬性 其他',
    subject: '主旨',
    content: '需求說明',
    uid: '承辦人',
    workDay: '技術工作天數',
    testDay: '測試天數',
    estEndDate: '預計完成日期',
    realStartDate: '實際開工日期',
    estStartDate: '預計開工日期',
    onlineDate: '正式上線日期'
};
