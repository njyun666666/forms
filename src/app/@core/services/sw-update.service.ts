import { LoadingService } from './loading.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwUpdateService {

  needReload: boolean = false;

  constructor(
    private updates: SwUpdate,
    router: Router,
    // private loadingService: LoadingService
  ) {

    if (updates.isEnabled) {

      router.events.subscribe((event) => {

        // console.log(event);
        if (event instanceof NavigationStart) {

          // this.loadingService.reloadLoading$.next(true);

          // console.log(event);
          this.checkForUpdate();

          // console.log('getNeedRelod', this.needReload);

          if (this.needReload) {
            document.location.href = event.url;
            // document.location.reload();
          }

        }

        // if (event instanceof NavigationEnd && !this.needReload) {
        //   this.loadingService.reloadLoading$.next(false);
        // }

      });

      // 60mins
      interval(60 * 60 * 1000).subscribe(() => {
        this.checkForUpdate();
      });


    } // end if

  }

  checkForUpdate() {
    this.updates.checkForUpdate().then(() => {
      // console.log(dayjs().format('YYYY-MM-DD HH:mm:ss') + ' _ _ ' + 'sw checkForUpdate');
    });
  }

  /**
   * 檢查更新
   */
  availableSubToReload() {

    // console.log('availableSubToReload');

    if (this.updates.isEnabled) {

      // console.log('availableSubToReload', true);

      this.updates.available.subscribe(event => {

        this.updates.activateUpdate().then(() => {
          this.needReload = true;
          // document.location.reload();
        });

      });


    } // end if


  }


}
