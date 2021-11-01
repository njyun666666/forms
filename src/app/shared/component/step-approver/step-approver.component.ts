import { Component, Input, OnInit } from '@angular/core';
import { NowStepApproverModel } from 'app/@core/models/form9s/now-step-approver.model';

@Component({
  selector: 'ngx-step-approver',
  templateUrl: './step-approver.component.html',
  styleUrls: ['./step-approver.component.scss']
})
export class StepApproverComponent implements OnInit {


  @Input() in_list: NowStepApproverModel[];

  constructor() { }

  ngOnInit(): void {

    // console.log(this.in_list);

  }

}
