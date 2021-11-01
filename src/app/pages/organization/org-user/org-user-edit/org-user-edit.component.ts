import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrgAccountInfoStruct } from '../../../../@core/models/organization/org-account-info';

@Component({
  selector: 'ngx-org-user-edit',
  templateUrl: './org-user-edit.component.html',
  styleUrls: ['./org-user-edit.component.scss']
})
export class OrgUserEditComponent implements OnInit {


  uid: string;
  name: string;
  


  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.uid = this.route.snapshot.queryParamMap.get('uid');

    // this.userActive

    // console.log(uid);
  }

}
