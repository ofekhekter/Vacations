import { readFile } from "fs/promises";

export const getOneImageLogic = async (imageName: string): Promise<Buffer> => {
  const uploadImage = await readFile(`./src/Assets/images/${imageName + ".jpg"}`);
  return uploadImage;
};
