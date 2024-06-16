export enum RES_CODE {
  SUCCESS = 0,
  PASS_ERROR = 400,
  SER_ERROR = 500,
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
