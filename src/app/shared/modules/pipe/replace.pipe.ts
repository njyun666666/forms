import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: string): unknown {

    if (value === undefined || value === null) {
      return '';
    }

    return value.replace(/\n/g, '<br>');
  }

}
