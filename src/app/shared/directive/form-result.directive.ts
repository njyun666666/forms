import { SignResultType } from './../../@core/Enum/sign-result-type.enum';
import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngxFormResult]'
})
export class FormResultDirective implements OnInit {

  @Input() ngxFormResult: SignResultType;

  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) { }


  ngOnInit() {


    this.render.addClass(this.el.nativeElement, 'border');
    // this.render.addClass(this.el.nativeElement, 'border-2');
    this.render.addClass(this.el.nativeElement, 'rounded');
    this.render.addClass(this.el.nativeElement, 'p-1');
    this.render.addClass(this.el.nativeElement, 'fw-bold');
    this.render.setStyle(this.el.nativeElement, 'display', 'inline-block');

    switch (this.ngxFormResult) {
      case SignResultType.agree:
      case SignResultType.case_completed:
        this.render.addClass(this.el.nativeElement, 'border-success');
        this.render.addClass(this.el.nativeElement, 'text-success');
        break;

      case SignResultType.reject:
        this.render.addClass(this.el.nativeElement, 'border-danger');
        this.render.addClass(this.el.nativeElement, 'text-danger');
        break;

      default:
        this.render.addClass(this.el.nativeElement, 'border-secondary');
        this.render.addClass(this.el.nativeElement, 'text-secondary');
        break;
    }

  }

}
