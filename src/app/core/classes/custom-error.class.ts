export class CustomError {
  message: string;
  status?: number;

  constructor(msg: string, status?: number) {
    this.message = msg;
    this.status = status;
  }
}
