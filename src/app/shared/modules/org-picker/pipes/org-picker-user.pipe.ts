import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orgPickerUser'
})
export class OrgPickerUserPipe implements PipeTransform {

  transform(value: Array<any>, args: string): unknown {
    // console.log(value);
    // console.log(args);

    if (value === undefined || value === null || value.length === 0) {
      return [];
    }

    value = value.map(x => {
      x.checked = false;
      return x;
    });

    // console.log(value);

    if (args !== undefined && args.length > 0) {
      return value.filter(
        x => x.employeeID.toUpperCase().indexOf(args.toUpperCase()) > -1
          || x.name.toUpperCase().indexOf(args.toUpperCase()) > -1
          || x.deptName.toUpperCase().indexOf(args.toUpperCase()) > -1
      );
    }

    return value;
  }

}
