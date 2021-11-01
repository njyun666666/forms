import { Observable } from 'rxjs';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { FlowchartModel, FlowchartViewModel } from 'app/@core/models/flowchart/flowchart.model';

@Injectable({
  providedIn: 'root'
})
export class FlowchartService {

  constructor(
    private apiService: ApiService
  ) { }


  getFlowchart(data: FlowchartModel): Observable<FlowchartViewModel> {
    return this.apiService.post('Flow/GetFlowchart', data);
  }

}
