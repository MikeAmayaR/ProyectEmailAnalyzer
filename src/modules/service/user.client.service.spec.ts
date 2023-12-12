import { Test, TestingModule } from '@nestjs/testing';
import { ProfileUserClientService } from './user.client.service';

describe('ProfileUserClientService', () => {
  let service: ProfileUserClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileUserClientService],
    }).compile();

    service = module.get<ProfileUserClientService>(ProfileUserClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
