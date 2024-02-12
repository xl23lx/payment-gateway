import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { mock } from 'jest-mock-extended';

describe('AuthController', () => {
  let controller:AuthController;
  let service:AuthService;
  let usersRepository:Repository<User>;

  beforeEach(async () => {
    service=new AuthService(usersRepository);
    controller=new AuthController(service);
  });

  describe('login',()=>{
    it('Should login', async () => {
      const req=mock<Request>();
      const user=mock<User>();
      const result={msg:"User logged in",user:jest.fn().mockResolvedValue(user)};
      jest.spyOn(service, 'login').mockImplementation(async () => result);
      expect(await controller.login(req)).toHaveProperty('user');
    });
  })
});
