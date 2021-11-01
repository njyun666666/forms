import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any, field: string, value: any): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    return array.filter(x => x[field] === value);
  }

}
