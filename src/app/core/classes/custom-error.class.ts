export class CustomError {
  message: string;
  name?: string;

  constructor(msg: string, name?: string) {
    this.message = msg;
    this.name = name;
  }
}
