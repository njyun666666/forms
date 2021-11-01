import { Component, Input, OnInit } from '@angular/core';
import { SignResultTypeModel } from 'app/@core/models/form9s/sign/sign-result-type.model';

@Component({
  selector: 'ngx-form-result-display',
  templateUrl: './form-result-display.component.html',
  styleUrls: ['./form-result-display.component.scss']
})
export class FormResultDisplayComponent implements OnInit {

  @Input() in_SignResult: SignResultTypeModel;


  constructor() { }

  ngOnInit(): void {
  }

}
