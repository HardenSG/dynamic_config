export enum RES_CODE {
  OK = 0,
  PARAMS_ERROR = 400,
  SERVER_ERROR = 500,
}

export class BizResponse<T> {
  private code: RES_CODE
  private msg: string
  private data?: T
  constructor(code: number, msg: string, data?: T) {
    this.code = code
    this.data = data
    this.msg = msg
  }

  public getCode() {
    return this.code
  }

  public getMsg() {
    return this.msg
  }

  public getData() {
    return this.data
  }
}
