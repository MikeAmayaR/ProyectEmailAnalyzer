import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../database/schema.db';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProfileUserClientService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
    private jwtService: JwtService,
  ) {}

  async findUserById(id: number): Promise<Users> {
    const user = await this.usersModel.findByPk<Users>(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateDataUsers(id: number, data: any): Promise<Users> {
    const user = await this.findUserById(id);
    Object.assign(user, data);
    await user.save();
    return user;
  }

  verifyJWT(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
