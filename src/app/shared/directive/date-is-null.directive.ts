import { NgControl } from '@angular/forms';
import { Directive, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

@Directive({
  selector: '[ngxDateIsNull]'
})
export class DateIsNullDirective implements OnInit {

  constructor(
    private control: NgControl
  ) { }

  ngOnInit(): void {

    this.control.control.valueChanges.subscribe((val) => {

      if (val != null && !dayjs(val).isValid()) {
        this.control.control.setValue(null);
      }

    });
  }


}
