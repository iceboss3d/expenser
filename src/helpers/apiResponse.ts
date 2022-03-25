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
  ): GenericResponse<Type> {
    return new ApiResponse(message, true, statusCode, data);
  }

  public static fail<Type>(
    message: string,
    statusCode: number = HttpStatus.NOT_FOUND,
  ): GenericResponse<Type> {
    return new ApiResponse(message, false, statusCode);
  }
}

export { ApiResponse };

export interface GenericResponse<Type> {
  statusCode: number;
  status: boolean;
  message: string;
  data?: Type;
}
