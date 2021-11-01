import { Form9sService } from 'app/@core/services/form9s/form9s.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SignFormModel } from '../models/form9s/sign/sign-form.model';

@Injectable({
  providedIn: 'root'
})
export class SignFormResolver implements Resolve<SignFormModel> {

  constructor(
    private form9sService: Form9sService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SignFormModel> {

    const signid = Number(route.paramMap.get('signID'));
    const formID = route.queryParamMap.get('formID');


    return this.form9sService.getSignForm({ id: signid, formID: formID });
  }
}
