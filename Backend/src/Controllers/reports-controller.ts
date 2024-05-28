import express, { NextFunction, Request, Response } from "express";
import { createCSV } from "../Logic/reports-logic";
import { join } from 'path';
import { FollowingsDataSetModel } from "../Models/FollowingsModel";

const router = express.Router();

router.post("/download", async (req: Request, res: Response, next: NextFunction) => {
    const vacations = req.body as FollowingsDataSetModel[];
    try {
      const filePath = await createCSV(vacations);
      res.download(filePath, 'destinations.csv', (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
          res.status(500).send('Error downloading the file');
        }
      });
    } catch (error) {
      console.error('Error creating the CSV file:', error);
      res.status(500).send('Error creating the CSV file');
    }
});

export default router;
