import { FormDemo1AddComponent } from './../../../pages/form9s/forms/demo1/form-demo1-add/form-demo1-add.component';
import { FormDemoAddComponent } from "app/pages/form9s/forms/form-demo/form-demo-add/form-demo-add.component";
import { FormSrAddComponent } from "../../../pages/form9s/forms/form-sr/form-sr-add/form-sr-add.component";

/**
 * 依FormClass取得 表單元件
 * [formClass, 表單元件]
 */
export const FormClassMapping = new Map<string, any>(
  [
    ['DEMO', FormDemoAddComponent],
    ['SR', FormSrAddComponent],
    ['DEMO1', FormDemo1AddComponent],
  ]
);
