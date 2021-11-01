import { DialogService } from './../../../@core/services/dialog.service';
import { FileService } from './../../../@core/services/file.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FileInfoViewModel } from 'app/@core/models/file.model';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { ResponseCode } from 'app/@core/Enum/response-code.enum';

@Component({
  selector: 'ngx-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit, OnDestroy, OnChanges {

  debug: boolean = !environment.production;


  @Input() in_fileGroupID: string;
  // @Input() editAuth: boolean = false;


  list: FileInfoViewModel[] = [];

  getFileListSub: Subscription;

  /**Unit: Byte */
  fileSizeLimit_MB: number = environment.fileSizeLimit_MB;
  fileSizeLimit: number = this.fileSizeLimit_MB * 1024 * 1024;
  fileSizeError: string = '附件大小限制 ' + this.fileSizeLimit_MB + ' MB 以下';

  isSubmit: boolean = false;

  constructor(
    private fileService: FileService,
    private dialogService: DialogService
  ) { }



  ngOnInit(): void {
    // console.log('fileGroupID', this.fileGroupID);
    // console.log(this.editAuth);


  }

  ngOnDestroy(): void {
    this.getFileListSub.unsubscribe;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('fileGroupID', this.fileGroupID);
    // console.log('changes', changes);


    this.getFileListSub = this.fileService.getFileList({ groupID: this.in_fileGroupID }).subscribe((data) => {
      this.list = data.map(x => {
        x.isDelete = false;
        return x;
      });
    });

  }


  onFileSelect(event) {

    if (event.target.files.length > 0) {


      let error_list: string[] = [];

      const formData: FormData = new FormData();
      formData.append('groupID', this.in_fileGroupID);


      for (const file of event.target.files) {

        // 超過大小不傳到後端
        if (file.size > this.fileSizeLimit) {
          error_list.push(file.name);
        } else {
          formData.append('file', file);
        }

      }



      if (formData.get('file') == null) {

        this.showError(this.fileSizeError, error_list);

      } else {

        this.isSubmit = true;

        // upload
        this.fileService.upload(formData).subscribe((data) => {


          if (data.list.length > 0) {
            this.list = [...this.list, ...data.list.map(x => { x.isDelete = false; return x; })];
          }


          if (data.error_list.length > 0) {
            error_list = [...error_list, ...data.error_list];
          }

          if (error_list.length > 0) {
            this.showError(data.error_message, error_list);
          }

          this.isSubmit = false;

        }, (error) => {
          this.isSubmit = false;
        });


      }

    }



  }

  showError(title: string, file_list: string[]) {
    title = title === null ? this.fileSizeError : title;
    this.dialogService.text({ title: '失敗：' + title, content: file_list.join('<br>') });
  }



  delete(data: FileInfoViewModel) {

    const dialogRef = this.dialogService.showDialog({
      content: '刪除 ' + data.oFileName + ' ?',
      btnText: '刪除',
      btnColor: 'danger'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log(result);

        this.isSubmit = true;

        const fileID = data.fileID;

        this.fileService.deleteFile({ fileID: fileID }).subscribe((data) => {

          if (data.code === ResponseCode.success) {
            this.list = this.list.filter(x => x.fileID !== fileID);
          }

          this.isSubmit = false;
        }, (error) => {
          this.isSubmit = false;
        });

      }
    });

  }





}
