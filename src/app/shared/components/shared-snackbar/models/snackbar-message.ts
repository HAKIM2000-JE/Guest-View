export class SnackbarMessage {
  message: string;
  callToActionMessage: string;
  type: 'info' | 'warning' |'error';

  constructor(message: string, type?: 'info' | 'warning' |'error',
              callToActionMessage?: string) {
    this.message = message;
    this.callToActionMessage = callToActionMessage;
    this.type = type || 'info';
  }
}
