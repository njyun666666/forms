import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { DeleteFileModel, FileInfoViewModel, FileUploadResultModel, GetFileListModel } from '../models/file.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private apiService: ApiService
  ) { }

  upload(data: FormData): Observable<FileUploadResultModel> {
    return this.apiService.post('File/Upload', data);
  }

  getFileList(data: GetFileListModel): Observable<FileInfoViewModel[]> {
    return this.apiService.post('File/GetFileList', data);
  }

  deleteFile(data: DeleteFileModel): Observable<ResponseModel<any>> {
    return this.apiService.post('File/Delete', data);
  }

}
