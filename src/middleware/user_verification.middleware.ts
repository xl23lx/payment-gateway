import { UnauthorizedException } from '@nestjs/common';
import {Request,Response,NextFunction} from 'express';

export function validateIfAdmin(req:Request,res:Response,next:NextFunction){
    let user:any=req.user;
    if(user.is_admin===false){
        throw new UnauthorizedException('You cannot perform this action');
    }
    next();
}