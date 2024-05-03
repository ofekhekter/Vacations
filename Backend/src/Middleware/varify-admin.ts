import { Request, Response, NextFunction } from 'express';
import { verifyAdmin } from '../Utils/cyber';
import { UnauthorizedError } from '../Models/ErrorModels';

export const verifyAdminMW = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin) UnauthorizedError("You are not allowed! only admins can get access.");
        next();
    } catch(err){
        next(err);
    }
}