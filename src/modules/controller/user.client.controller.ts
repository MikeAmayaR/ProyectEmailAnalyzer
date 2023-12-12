import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersDto } from '../dto/user.dto';
import { ProfileUserClientService } from '../service/user.client.service';
import { ApiKeyGuard } from '../../auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@ApiTags('profile-user-client')
@Controller('profile-user-client')
export class ProfileUserController {
  constructor(private profileUserClientService: ProfileUserClientService) {}

  @Put(':userId')
  @ApiOperation({ summary: 'Update of users' })
  async updateUsers(@Param('userId') id: number, @Body() payload: UsersDto) {
    return this.profileUserClientService.updateDataUsers(id, payload);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get of users' })
  async getUsers(@Param('userId') id: number) {
    return this.profileUserClientService.findUserById(id);
  }
}
