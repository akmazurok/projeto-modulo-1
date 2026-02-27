import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'signedValue',
})
export class SignedValuePipe implements PipeTransform {
  transform(value: number, type: string): number {
    if (value == null) return 0;

    return type === 'expense' ? -Math.abs(value) : Math.abs(value);
  }
}
