import { SignResultType } from 'app/@core/Enum/sign-result-type.enum';
import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[ngxSignResultLabel]'
})
export class SignResultLabelDirective implements OnInit {

  @Input() ngxSignResultLabel: SignResultType;

  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) { }


  ngOnInit() {

    this.render.addClass(this.el.nativeElement, 'badge');
    // this.render.addClass(this.el.nativeElement, 'rounded-pill');


    switch (this.ngxSignResultLabel) {
      case SignResultType.agree:
      case SignResultType.case_completed:
        this.render.addClass(this.el.nativeElement, 'bg-success');
        break;
      case SignResultType.reject:
        this.render.addClass(this.el.nativeElement, 'bg-danger');
        break;

      default:
        this.render.addClass(this.el.nativeElement, 'bg-secondary');
        break;
    }

  }


}
