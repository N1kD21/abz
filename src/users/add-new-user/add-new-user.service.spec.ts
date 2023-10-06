import { Test, TestingModule } from '@nestjs/testing';
import { AddNewUserService } from './add-new-user.service';

describe('AddNewUserService', () => {
  let service: AddNewUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddNewUserService],
    }).compile();

    service = module.get<AddNewUserService>(AddNewUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
