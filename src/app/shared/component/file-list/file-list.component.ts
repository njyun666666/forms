import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { FileInfoViewModel } from 'app/@core/models/file.model';
import { FileService } from 'app/@core/services/file.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit, OnDestroy, OnChanges {

  @Input() in_formID: string;
  @Output() fileCountEmitter = new EventEmitter<number>();
  list: FileInfoViewModel[] = [];

  getFileListSub: Subscription;




  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {
    pageLength: 30,
    order: [[3, 'asc']],
    searching: false,
    dom: '<"top" >rt  <"bottom"fip>  <"clear">',
    language: {
      url: 'assets/packages/datatables/i18n/zh-tw.json'
    }
  };


  constructor(
    private fileService: FileService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.getFileListSub.unsubscribe;
    this.dtTrigger.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('fileGroupID', this.fileGroupID);
    // console.log('changes', changes);


    this.getFileListSub = this.fileService.getFileList({ formID: this.in_formID }).subscribe((data) => {
      this.list = data;

      this.fileCountEmitter.emit(data.length);

      this.dtTrigger.next();
    });

  }

}
