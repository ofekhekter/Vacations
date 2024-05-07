import express, { NextFunction, Request, Response } from "express";
import { getOneImageLogic } from "../Logic/images-logic";

const router = express.Router();

router.get("/images/:imageName", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageName = req.params.imageName;
      const imageFile = await getOneImageLogic(imageName);
      res.status(200).json(imageFile);
    } catch (err) {
      next(err);
    }
  }
);

export default router;