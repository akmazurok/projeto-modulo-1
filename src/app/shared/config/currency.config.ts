import { NgxCurrencyConfig } from 'ngx-currency';

export const CURRENCY_OPTIONS: NgxCurrencyConfig = {
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  decimal: ',',
  precision: 2,
  allowNegative: false,
  allowZero: true,
  nullable: false,
  align: 'left',
};