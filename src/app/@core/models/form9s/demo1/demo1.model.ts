import { FormListModel } from 'app/@core/models/form9s/form/form-list.model';
import { FieldName } from '../../field-name';
export interface Demo1model extends FormListModel {
  test1: string;
  test2: string;
}

export const DEMO1FieldNameJson: FieldName = {
  test1: 'AAA欄位',
  test2: 'BBB欄位'
};
