import express, { NextFunction, Request, Response } from "express";
import { addfollowingLogic, deletefollowingLogic } from "../Logic/followings-logic";

const router = express.Router();

router.post("/followings/:vacationId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.body as number;
      const vacationId = +req.params.vacationId;
      await addfollowingLogic(userId, vacationId);
      res.status(201).json("add following successfully");
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/followings/:vacationId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.body as number;
      const vacationId = +req.params.vacationId;
      await deletefollowingLogic(userId, vacationId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);
  
export default router;
