import express, { NextFunction, Request, Response } from "express";
import { addOneImageLogic, deleteImageLogic, getOneImageLogic } from "../Logic/images-logic";
import { ImageModel } from "../Models/ImageModel";
import { upload } from "../Middleware/multer";

const router = express.Router();


router.get("/images/:imageName", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageName = req.params.imageName;
    const imageFile = await getOneImageLogic(imageName);
    res.status(200).json(imageFile);
  } catch (err) {
    next(err);
  }
});

router.post("/images", upload.single('imageFile'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageName = req.body.imageName;
    const imageFile = req.file;
    const image = { imageName, imageFile } as ImageModel;
    await addOneImageLogic(image);
    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (err) {
    next(err);
  }
});

router.delete("/images/:imageName", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageName = req.params.imageName;
    await deleteImageLogic(imageName);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;