import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AppModule } from 'src/app.module';
describe('AuthGuard', () => {
  let guard: AuthGuard;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
    }).compile();
    guard = module.get<AuthGuard>(AuthGuard);
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
