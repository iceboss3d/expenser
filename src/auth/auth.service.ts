import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiResponse, IGenericResponse } from 'src/helpers/apiResponse';
import { UserRequestDto, UserResponseDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(
    data: UserRequestDto,
  ): Promise<IGenericResponse<UserResponseDto>> {
    try {
      const user = await this.userService.createUser(data);
      return ApiResponse.success<UserResponseDto>(
        'Registration Successfull',
        HttpStatus.CREATED,
        user,
      );
    } catch (error) {
      return ApiResponse.fail<UserResponseDto>(
        error.message,
        HttpStatus.CONFLICT,
      );
    }
  }

  async login(data: UserRequestDto) {
    try {
      const { username, password } = data;
      const user = await this.userService.getUser(username);
      const same: boolean = await bcrypt.compare(password, user.password);

      if (!same) {
        return ApiResponse.fail<UserResponseDto>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
      }
      let userData = { ...user.toResponseObject(), token: '' };
      userData.token = await jwt.sign(
        user.toResponseObject(),
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_TIMEOUT_DURATION },
      );
      return ApiResponse.success("Login Successfull", HttpStatus.OK, userData);
    } catch (error) {
      return ApiResponse.fail<UserResponseDto>(
        'Invalid Credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
