export class ClientException extends Error {
  public displayMessage: string;

  constructor(displayMessage: string, message?: string) {
    super(message ?? displayMessage);
    this.displayMessage = displayMessage;
  }
}
