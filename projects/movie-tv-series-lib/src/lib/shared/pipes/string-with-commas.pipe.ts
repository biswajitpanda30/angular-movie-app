import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceCommasInString',
})
export class StringWithCommas implements PipeTransform {
  transform(value: string) {
    if (value) {
      return value.replace(/,/g,' | ');
    }
    return value;
  }
}
