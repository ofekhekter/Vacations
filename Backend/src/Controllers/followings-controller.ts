import express, { NextFunction, Request, Response } from "express";
import { addfollowingLogic, deletefollowingLogic, getAllFollowingsLogic, getAllFollowingsOfUserIdLogic } from "../Logic/followings-logic";

const router = express.Router();

router.post("/followings/:vacationId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.body as { userId: number };
      const vacationId = +req.params.vacationId;
      await addfollowingLogic(userId.userId, vacationId);
      res.status(201).json("add following successfully");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/followings/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = +req.params.userId;
      const allFollowings = await getAllFollowingsOfUserIdLogic(userId);
      res.status(200).json(allFollowings);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/followings", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const totalFollowings = await getAllFollowingsLogic();
      res.status(200).json(totalFollowings);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/followings/:vacationId/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacationId = +req.params.vacationId;
      const userId = +req.params.userId;
      await deletefollowingLogic(userId, vacationId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);
  
export default router;
