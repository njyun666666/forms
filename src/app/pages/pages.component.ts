import { PageService } from './../@core/services/page.service';
import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { NbIconLibraries, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout #layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit, AfterViewInit, OnDestroy {

  sidebarEl: ElementRef;
  contentEl: ElementRef;
  isXl: boolean = false;
  hideMenuOnClick: boolean = false;
  sidebarStatus: string;
  listenEnable: boolean = false;

  listenSidebarMouseEnter: () => void;
  listenSidebarMouseLeave: () => void;
  listenContentClick: () => void;

  private ngUnsubscribe = new Subject();

  menu = [];

  public constructor(
    private el: ElementRef,
    private render: Renderer2,
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private menuService: NbMenuService,
    private breakpointService: NbMediaBreakpointsService,
    private pageService: PageService,
    private iconsLibrary: NbIconLibraries
  ) {

    iconsLibrary.registerFontPack('font-awesome', { packClass: 'fas' });
    iconsLibrary.setDefaultPack('font-awesome');
  }


  ngOnInit(): void {

    this.pageService.getMenu().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((menu) => {
        this.menu = menu.data;
        this.pageService.menuLoading$.next(false);
      });

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  ngAfterViewInit(): void {




    this.sidebarEl = this.el.nativeElement.querySelector('nb-sidebar[tag=menu-sidebar]');
    this.contentEl = this.el.nativeElement.querySelector('.layout>.layout-container>.content');
    // console.log(this.el.nativeElement);
    // console.log(this.contentEl);

    this.listenSidebar();


    const { is } = this.breakpointService.getBreakpointsMap();

    // console.log('getBreakpoints',this.breakpointService.getBreakpoints());

    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint),
      )
      .subscribe(currentBreakpoint => {


        this.hideMenuOnClick = currentBreakpoint.width <= is;

        if (this.hideMenuOnClick) {
          this.unlistenSidebar();


          try {
            this.unlistenContent();
          } catch (error) { }
          // this.listenContent();

        } else {
          this.unlistenSidebar();
          this.listenSidebar();

          try {
            this.unlistenContent();
          } catch (error) { }

        }



      });


    // this.sidebarService.onExpand().subscribe((side) => {
    //   // this.listenContent();
    //   console.log('this.sidebarService.onExpand', side);
    // });

    this.sidebarService.onCollapse().subscribe((side) => {
      this.unlistenContent();
    });

    // this.sidebarService.onCompact().subscribe((side) => {
    //   // this.listenContent();
    //   console.log('this.sidebarService.onCompact', side);
    // });

    this.sidebarService.onToggle().subscribe((side) => {

      // console.log('this.sidebarService.onToggle', side);

      this.unlistenContent();

      if (this.hideMenuOnClick) {
        // console.log('this.sidebarService.onToggle', 'if');

        this.listenContent();
      }
      // this.unlistenContent();
    });



    this.menuService.onItemClick().subscribe(() => {
      if (this.hideMenuOnClick) {
        this.sidebarService.collapse('menu-sidebar');
      }
      this.unlistenContent();
    });



  }


  listenSidebar(): void {

    this.listenSidebarMouseEnter = this.render.listen(this.sidebarEl, 'mouseenter', (event) => {
      this.sidebarService.expand('menu-sidebar');
      // this.stateService.sideBarCompactedSetting = this.sidebarEl['classList'].contains('compacted');
    });

    this.listenSidebarMouseLeave = this.render.listen(this.sidebarEl, 'mouseleave', (event) => {
      this.sidebarService.toggle(true, 'menu-sidebar');
    });


  }


  unlistenSidebar(): void {
    try {
      this.listenSidebarMouseEnter();
      this.listenSidebarMouseLeave();
    } catch (error) { }
  }


  listenContent(): void {

    this.listenContentClick = this.render.listen(this.contentEl, 'click', (event) => {
      // this.sidebarService.collapse('menu-sidebar');

      if (this.listenEnable) {
        // console.log('this.listenContentClick');
        this.sidebarService.toggle(true, 'menu-sidebar');
        this.unlistenContent();
      }

      this.listenEnable = true;
    });


  }


  unlistenContent(): void {
    this.listenEnable = false;
    try {
      this.listenContentClick();
    } catch (error) { }

    // console.log('this.listenContentClick - un');
  }


}
