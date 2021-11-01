import { Form9sService } from 'app/@core/services/form9s/form9s.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormsViewModel } from '../models/form9s/form/forms.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class FormsResolver implements Resolve<FormsViewModel[]> {

  constructor(
    private form9sService: Form9sService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormsViewModel[]> {
    return this.form9sService.getForms();
  }
}
