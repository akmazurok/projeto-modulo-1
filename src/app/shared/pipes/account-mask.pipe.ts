import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountMask',
})
export class AccountMaskPipe implements PipeTransform {
  transform(value: string | number | null): string {
    if (!value) return '';

    const numbers = value.toString().replace(/\D/g, '');

    if (numbers.length <= 4) {
      return numbers;
    }

    return `${numbers.slice(0, 4)}-${numbers.slice(4, 5)}`;
  }
}
