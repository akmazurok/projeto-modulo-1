import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negativeValue',
})
export class NegativeValuePipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) return '';
    if (value > 0) {
      return 'text-success';
    }
    if (value < 0) {
      return 'text-danger';
    }

    return '';
  }
}
