import { PageService } from './../../../@core/services/page.service';
import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout >
      <nb-layout-header subheader>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" compactedBreakpoints="['xs', 'is', 'sm', 'md', 'lg', 'xl','xxl', 'xxxl']" responsive   [nbSpinner]="this.pageService.menuLoading$ | async" nbSpinnerStatus="basic">
        <ng-content select="nb-menu" ></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <!-- <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer> -->
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {


  // menuLoading: boolean = true;

  constructor(public pageService: PageService) {

    // this.pageService.menuLoading$.subscribe((data) => {
    //   console.log('layout subscribe', data);
    //   this.menuLoading = data;
    //   console.log('layout subscribe this.menuLoading', this.menuLoading);
    // });

  }

}
