import { Directive, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as dayjs from 'dayjs';

@Directive({
  selector: '[ngxDateSet]'
})
export class DateSetDirective implements OnInit, OnChanges {


  @Input() minDate;

  constructor(
    private control: NgControl
  ) { }

  ngOnInit(): void {



    this.control.control.valueChanges.subscribe((val) => {
      // console.log(this.min);
      // console.log(this.control.control);

      if (val != null && !dayjs(val).isValid()) {
        this.control.control.setValue(null);
      }

    });
  }

  ngOnChanges(changes: SimpleChanges): void {

    const min = changes.minDate.currentValue;
    const value = this.control.control.value;

    // console.log(changes, `min=${min} , value=${value}`);


    if (min && dayjs(min).isValid() && value) {

      if (dayjs(min).isAfter(value)) {
        this.control.control.setValue(min);
      }

    }

  }

}
