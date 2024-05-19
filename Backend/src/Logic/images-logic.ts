import { readFile } from "fs/promises";
import { ImageModel } from "../Models/ImageModel";
import fs from 'fs';


export const getOneImageLogic = async (imageName: string): Promise<Buffer> => {
  const uploadImage = await readFile(`./src/Assets/images/${imageName + ".jpg"}`);
  return uploadImage;
};

export const addOneImageLogic = async (image: ImageModel): Promise<void> => {
  if (!image.imageFile) {
    throw new Error("No image file provided");
  }
  const tempFilePath = image.imageFile.path;
  const destinationPath = `./src/Assets/images/${image.imageName}.jpg`;
  fs.renameSync(tempFilePath, destinationPath);
};

export const deleteImageLogic = async (imageName: string): Promise<void> => {
  const destinationPath = `./src/Assets/images/${imageName}.jpg`;
  fs.unlinkSync(destinationPath);
};
