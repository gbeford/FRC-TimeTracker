import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: boolean, args?: any): any {
    let status;

    if (value) {
      status = 'In';
    } else {
      status = 'Out';
    }

    return status;
  }


}
