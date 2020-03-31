import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length'
})
export class LengthPipe implements PipeTransform {

  transform(length: number): string {
    const min = Math.floor(length % 60);
    return Math.floor(length / 60) + 'h' + (!min ? '' : min < 10 ? '0' + min : min);
  }

}
