import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'ngx-html5-datetime-picker',
  templateUrl: './html5-datetime-picker.component.html',
  styleUrls: ['./html5-datetime-picker.component.scss']
})
export class Html5DatetimePickerComponent implements OnInit {

  @Input() datetimeControl: FormControl;

  date: string;
  time: string;

  constructor() { }

  ngOnInit(): void {


    if (this.datetimeControl !== undefined && this.datetimeControl.value != null) {
      const val = this.datetimeControl.value;

      if (dayjs(val).isValid()) {
        this.date = dayjs(val).format('YYYY-MM-DD');
        this.time = dayjs(val).format('HH:mm');
      }

    }


  }


  dateChange(val) {

    if (!this.time) {
      this.time = dayjs().format('HH:mm');
    }

    this.datetimeControl.setValue(val + ' ' + this.time);

  }

  timeChange(val) {

    if (!this.date) {
      this.date = dayjs().format('YYYY-MM-DD');
    }

    this.datetimeControl.setValue(this.date + ' ' + val);

  }



}
