import express, { NextFunction, Request, Response } from "express";
import { addOneVacationLogic, deleteVacationLogic, getAllVacationsLogic, getOneVacationLogic, updateVacationLogic } from "../Logic/vacations-logic";
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
  
  router.post("/vacations", verifyAdminMW, async (req: Request, res: Response, next: NextFunction) => {
      try {
        const vacation = req.body as VacationType;
        const newVacation = await addOneVacationLogic(vacation);
        res.status(201).json(newVacation);
      } catch (err) {
        next(err);
      }
    }
  );
  
  router.put("/vacations/:id", verifyAdminMW, async (req: Request, res: Response, next: NextFunction) => {
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
