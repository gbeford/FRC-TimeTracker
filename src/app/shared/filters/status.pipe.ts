import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: boolean, args?: any): any {
    let status;

    if (value) {
      status = 'Out';
    } else {
      status = 'In';
    }

    return status;
  }


}
