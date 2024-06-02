import express, { NextFunction, Request, Response } from "express";
import { LoginCredentials, UserType } from "../Models/UserModel";
import {  getUserByToken, getUserIdByEmail, isAdminLogic, loginUserLogic, signupUserLogic } from "../Logic/auth-logic";

const router = express.Router();

router.post("/auth/signup", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body as UserType;
      const response = await signupUserLogic(user);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/auth/signin", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const login = req.body as LoginCredentials;
      const token = await loginUserLogic(login);
      res.status(200).json(token);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/auth/isadmin", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.body as { email: string };
      const isAdmin = await isAdminLogic(email.email);
      res.status(200).json(isAdmin);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/auth/:email", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.params.email;
      const userId = await getUserIdByEmail(email);
      res.status(200).json(userId);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/getuser", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUserByToken(req);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
