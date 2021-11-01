import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CkeditorService {

  constructor(
    private tokenService: TokenService
  ) { }

  confiig() {
    return {
      // toolbar: {},

      image: {
        resizeUnit: 'px',
        // upload: {
        //   types: [ '' ]
        // }
      },
      /**
       * https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/simple-upload-adapter.html
      */
      simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: environment.apiUrl + 'File/CKEditorUpload',

        // Enable the XMLHttpRequest.withCredentials property.
        // withCredentials: true,

        // Headers sent along with the XMLHttpRequest to the upload server.
        headers: {
          'X-CSRF-TOKEN': 'CSRF-Token',
          token: this.tokenService.getToken()
        }
      }

    };
  }

}
