import { LoadingService } from './@core/services/loading.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SwUpdateService } from './@core/services/sw-update.service';
import { NavigationEnd, Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: `<div class="full-page-loading" *ngIf="loading" nbSpinner="ture" nbSpinnerStatus="primary"></div>
  <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {

  // reloadLoading: boolean = false;
  loading: boolean = false;
  activatedURL: string = '';

  // @ViewChild('') doc: ElementRef;

  constructor(
    private loadingService: LoadingService,
    swUpdateService: SwUpdateService,
    private router: Router
  ) {

    loadingService.loading$.subscribe((val) => {
      this.loading = val;
    });



    swUpdateService.availableSubToReload();


    // 相同router 重整處理
    this.router.events.subscribe((event) => {

      // console.log(event);

      if (event instanceof NavigationStart) {
        loadingService.loading$.next(true);

        const newURL = event.url.split('?')[0];

        if (newURL === this.activatedURL) {
          // console.log('NavigationStart ');
          // console.log('newURL= ' + newURL);
          // console.log('activatedURL= ' + this.activatedURL);


          this.router.navigateByUrl('/emply', { skipLocationChange: true }).then(() => {

            // console.log(event);
            this.activatedURL = '';
            this.router.navigateByUrl(event.url);
            // this.router.navigate([event.url]);
          }
          );

        }

      }

      if (event instanceof NavigationEnd) {
        this.activatedURL = location.pathname;
        // console.log('NavigationEnd= ' + this.activatedURL);

        loadingService.loading$.next(false);
      }

    });


  }

  ngOnInit(): void {
  }
}
