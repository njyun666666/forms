import { ResponseCode } from "../Enum/response-code.enum";

export declare class ResponseModel<T> {
  code: ResponseCode;
  message?: string;
  data?: T;
}
