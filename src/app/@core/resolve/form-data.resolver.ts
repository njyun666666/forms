import { Form9sService } from './../services/form9s/form9s.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataResolver implements Resolve<boolean> {

  constructor(
    private form9sService: Form9sService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    const formID = route.queryParamMap.get('formID');

    if (formID === undefined || formID == null) {
      return of(null);
    }

    return this.form9sService.getFormData({ formID: formID });
  }
}
