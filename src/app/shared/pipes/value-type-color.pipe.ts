import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueTypeColor',
})
export class ValueTypeColorPipe implements PipeTransform {
  transform(type: string): string {
    if (type === 'expense') {
      return 'text-danger';
    } else if (type === 'income') {
      return 'text-success';
    }
    return '';
  }
}
