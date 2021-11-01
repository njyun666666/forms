import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'app/@core/services/toastr.service';

import { ResponseCode } from '../../../../@core/Enum/response-code.enum';
import { GameInfoService } from '../../../../@core/services/game-info.service';

@Component({
  selector: 'ngx-game-add-dialog',
  templateUrl: './game-add-dialog.component.html',
  styleUrls: ['./game-add-dialog.component.scss']
})
export class GameAddDialogComponent implements OnInit {


  in_isAdd: boolean;
  in_DeptLevelID: string;

  // @Output() closeEmitter = new EventEmitter<any>();


  form: FormGroup;
  isSubmit: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<GameAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private gameInfoService: GameInfoService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    this.in_isAdd = this.data === undefined ? true : false;

    // console.log(this.data);
    // console.log(this.in_isAdd);


    this.form = this.fb.group({
      isAdd: this.fb.control(this.in_isAdd),
      appID: this.fb.control(null, [Validators.required]),
      appName: this.fb.control(null, [Validators.required]),
      timeZone: this.fb.control(null, [Validators.required]),
      area: this.fb.control(null, [Validators.required]),
    });

    if (this.data !== undefined) {
      this.form.patchValue(this.data);
    }


  }


  submit() {

    if (!this.form.valid) {
      // console.log('form.valid');
      return false;
    }

    if (this.isSubmit) { return false; }


    this.isSubmit = true;

    this.gameInfoService.addGameInfo(this.form.value)
      .subscribe(

        (data) => {
          if (data.code === ResponseCode.success) {

            const title = this.in_isAdd ? '新增成功' : '修改成功';

            this.toastrService.show(null, title, { status: 'success' });
            this.close(data);


          } else {

            this.toastrService.show(null, data.message, { status: 'danger' });
          }



          this.isSubmit = false;
        },

        (error) => {
          this.isSubmit = false;
        }
      );

  }



  close(result?) {
    this.dialogRef.close(result);
    // this.router.navigate(['/pages/organization']);
  }

}
