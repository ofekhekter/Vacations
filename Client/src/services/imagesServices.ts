import axios from "axios";
import { appConfig } from "../utils/appConfig";

export const getOneImage = async (imageName: string): Promise<Buffer> => {
  const fullUrl = appConfig.baseUrl + appConfig.get.oneImage + imageName;

  const data = await axios
    .get(fullUrl)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return data as Buffer;
};
