import axios from "axios";
import { appConfig } from "../utils/appConfig";
import { ImageModel } from "../Models/ImageModel";

export const getOneImage = async (imageName: string): Promise<Buffer> => {
  const fullUrl = appConfig.baseUrl + appConfig.get.oneImage + imageName;

  const data = await axios
    .get(fullUrl)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return data as Buffer;
};

export const addOneImage = async (imageName: string, imageFile: File): Promise<Buffer> => {
  const fullUrl = appConfig.baseUrl + appConfig.post.addOneImage;
  const imageObj = {imageName, imageFile} as ImageModel;
  const data = await axios
    .post(fullUrl, imageObj)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return data as Buffer;
};
