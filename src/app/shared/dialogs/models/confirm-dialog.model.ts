export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: ConfirmDialogType;
}

export type ConfirmDialogType = 'warn' | 'info' | 'success';