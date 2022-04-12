export class HttpError extends Error {
  __proto__ = Error;

  public code?: number;

  constructor(message: string, code?: number) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
export default HttpError;
