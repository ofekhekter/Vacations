import express, { NextFunction, Request, Response } from "express";
import { addOneVacationLogic, deleteVacationLogic, getAllFutureVacationsLogic, getAllVacationsByIdLogic, getAllVacationsLogic, getAllVacationsOffsetLogic, getOneVacationLogic, updateVacationLogic } from "../Logic/vacations-logic";
import { VacationType } from "../Models/VacationModel";
import { verifyAdminMW } from "../Middleware/varify-admin";

const router = express.Router();

router.get("/vacations", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacations = await getAllVacationsLogic();
      res.status(200).json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/vacations/:pageNumber/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = +req.params.pageNumber;
      const userId = +req.params.userId;
      const vacationsObj = await getAllVacationsOffsetLogic(page, userId);
      res.status(200).json(vacationsObj);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/vacations/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = +req.params.userId;
      const vacations = await getAllVacationsByIdLogic(userId);
      res.status(200).json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/futurevacations", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacations = await getAllFutureVacationsLogic();
      res.status(200).json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/vacations/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = +req.params.id;
        const vacation = await getOneVacationLogic(id);
        res.status(200).json(vacation);
      } catch (err) {
        next(err);
      }
    }
  );
  
  router.post("/vacations", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const vacation = req.body as VacationType;
        const newVacation = await addOneVacationLogic(vacation);
        res.status(201).json(newVacation);
      } catch (err) {
        next(err);
      }
    }
  );
  
  router.put("/vacations/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const vacation = req.body as VacationType;
        vacation.id = +req.params.id;
        const newVacation = await updateVacationLogic(vacation);
        res.status(200).json(newVacation);
      } catch (err) {
        next(err);
      }
    }
  );
  
  router.delete("/vacations/:id", verifyAdminMW, async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = +req.params.id;
        await deleteVacationLogic(id);
        res.sendStatus(204);
      } catch (err) {
        next(err);
      }
    }
  );
  
export default router;
