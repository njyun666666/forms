import { Directive, Input, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngxFormLevelLabel]'
})
export class FormLevelLabelDirective implements OnInit {

  @Input() ngxFormLevelLabel: number = 0;

  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) { }

  ngOnInit(): void {

    // console.log(this.ngxFormLevelLabel);

    this.render.addClass(this.el.nativeElement, 'badge');
    this.render.addClass(this.el.nativeElement, 'rounded-pill');


    switch (this.ngxFormLevelLabel) {
      case 1:
        this.render.addClass(this.el.nativeElement, 'bg-primary');
        break;
      case 2:
        this.render.addClass(this.el.nativeElement, 'bg-success');
        break;
      case 3:
        this.render.addClass(this.el.nativeElement, 'bg-danger');
        break;

      default:
        this.render.addClass(this.el.nativeElement, 'bg-secondary');
        break;
    }

  }

}
