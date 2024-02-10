import { Injectable } from '@angular/core';
import { NbToastrConfig, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(
    private nbToastrService: NbToastrService
  ) { }


  show(message: any, title?: any, userConfig?: Partial<NbToastrConfig>) {

    // switch (userConfig.status) {

    //   case 'success':
    //     userConfig.icon = 'fa-check';
    //     break;

    //   case 'danger':
    //     userConfig.icon = 'fa-times';
    //     break;

    //   default:
    //     break;
    // }


    this.nbToastrService.show(message, title, userConfig);
  }



}
