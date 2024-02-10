import { FieldName } from "../../field-name";
import { FormListModel } from "../form/form-list.model";

export interface DEMOModel extends FormListModel {
    aaa: string;
    bbb: string;
}

export const DEMOFieldNameJson: FieldName = {
    aaa: 'AAA欄位',
    bbb: 'BBB欄位'
};
