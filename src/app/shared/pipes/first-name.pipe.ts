import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName',
})
export class FirstNamePipe implements PipeTransform {
  transform(value: string | null | undefined, fallback = 'Usuário'): string {
    if (!value) return fallback;

    const cleaned = value.trim().replace(/\s+/g, ' ');

    if (!cleaned) return fallback;

    const firstName = cleaned.split(' ')[0];
    return this.capitalize(firstName);
  }

  private capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}
