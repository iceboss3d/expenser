import { HttpStatus } from '@nestjs/common';

class ApiResponse<Type> {
  public message: string;
  public status: boolean;
  public statusCode: number;
  public data: Type;

  constructor(
    message: string,
    status: boolean,
    statusCode: number,
    data?: Type,
  ) {
    this.message = message;
    this.status = status;
    this.statusCode = statusCode;
    this.data = data;
  }

  public static success<Type>(
    message: string,
    statusCode: number = HttpStatus.OK,
    data?: Type,
  ): IGenericResponse<Type> {
    return new ApiResponse(message, true, statusCode, data);
  }

  public static fail<Type>(
    message: string,
    statusCode: number = HttpStatus.NOT_FOUND,
  ): IGenericResponse<Type> {
    return new ApiResponse(message, false, statusCode);
  }
}

export { ApiResponse };

export interface IGenericResponse<Type> {
  statusCode: number;
  status: boolean;
  message: string;
  data?: Type;
}
