import { Observable } from 'rxjs';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { SearchModel } from 'app/@core/models/form9s/search.model';
import { FormInfoModel } from 'app/@core/models/form9s/form-info.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private apiService: ApiService
  ) { }


  formInfoList(data: SearchModel): Observable<FormInfoModel[]> {
    return this.apiService.post('Search/FormInfoList', data);
  }


}
