export default class ErrorDomain {
  public code: number;
  public message: string;

  constructor(code: number, message: string) {
    this.message = message;
    this.code = code;
  }
}