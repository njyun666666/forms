import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-org-add-dept',
  templateUrl: './org-add-dept.component.html',
  styleUrls: ['./org-add-dept.component.scss']
})
export class OrgAddDeptComponent implements OnInit, OnDestroy {


  private ngUnsubscribe = new Subject();

  in_isAdd = true;
  in_DeptID;
  in_ParentDept;

  constructor(
    // private router: Router,
    public dialogRef: MatDialogRef<OrgAddDeptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {

    // console.log(this.data);


    if (this.data.deptID !== undefined && this.data.deptID !== null) {
      this.in_isAdd = false;
    }

    this.in_DeptID = this.data.deptID;
    this.in_ParentDept = this.data.parentDept;

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  close(result?) {
    this.dialogRef.close(result);
    // this.router.navigate(['/pages/organization']);
  }


}
