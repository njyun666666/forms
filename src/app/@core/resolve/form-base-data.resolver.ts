import { Form9sService } from './../services/form9s/form9s.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { BaseDataRequestModel } from '../models/form9s/form/form-base-data.model';

@Injectable({
  providedIn: 'root'
})
export class FormBaseDataResolver implements Resolve<boolean> {

  constructor(
    private form9sService: Form9sService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    const formID = route.queryParamMap.get('formID');
    const formClass = route.paramMap.get('formClass');
    const stepType_str = route.data['stepType'];
    const signID_str = route.paramMap.get('signID');
    // console.log('stepType_str', stepType_str);

    let stepType: number;
    let signID: number;

    if (stepType_str === undefined || stepType_str === null) {
      stepType = null;
    } else {
      stepType = Number(stepType_str);
    }

    if (signID_str === undefined || signID_str === null) {
      signID = null;
    } else {
      signID = Number(signID_str);
    }


    const data: BaseDataRequestModel = {
      formClass: formClass,
      formID: formID,
      stepType: stepType,
      signID: signID
    };

    return this.form9sService.getBaseData(data);
  }
}
