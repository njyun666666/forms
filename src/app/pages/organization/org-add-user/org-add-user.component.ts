import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-org-add-user',
  templateUrl: './org-add-user.component.html',
  styleUrls: ['./org-add-user.component.scss']
})
export class OrgAddUserComponent implements OnInit {


  constructor(
    // private router: Router,
    public dialogRef: MatDialogRef<OrgAddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit(): void {
    // console.log(this.data);
  }

  close() {
    this.dialogRef.close();
    // this.router.navigate(['/pages/organization']);
  }

}
