import { IsDate, IsString, MinLength } from 'class-validator';

export class UserRequestDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class UserResponseDto {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}