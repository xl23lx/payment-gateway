import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Response } from 'express';
import { mock } from 'jest-mock-extended';

describe('UserController', () => {
  let controller: UserController;
  let service:UserService;
  let usersRepository:Repository<User>;

  beforeEach(async () => {
    service=new UserService(usersRepository);
    controller =new UserController(service);
  });
  describe('getUser',()=>{
    it('Should get user', async () => {
      const result={
        id:'',
        first_name:'',
        last_name:'',
        username:'',
        password:'',
        created_at:new Date(),
        updated_at:new Date(),
        is_active:false
      };
      jest.spyOn(service, 'getUser').mockImplementation(async () => result);
      expect(await controller.getUser('id')).toBe(result);
    });
  })

  describe('register',()=>{
    it('Should get user', async () => {
      const userData=mock<UserData>();
      const result={
        id:'',
        first_name:'',
        last_name:'',
        username:'',
        password:'',
        created_at:new Date(),
        updated_at:new Date(),
        is_active:false
      };
      jest.spyOn(service, 'register').mockImplementation(async () => result);
      expect(await controller.register(userData)).toBe(result);
    });
  })
  
});
