import axios from "axios";
import { appConfig } from "../utils/appConfig";

export const addFollow = async (userId: string, vacationId: string): Promise<string | any> => {
  try {
    const fullUrl = appConfig.baseUrl + appConfig.post.addFollow + vacationId;
    const data = await axios.post(fullUrl, userId);
    return data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const deleteFollow = async (userId: string, vacationId: string): Promise<void> => {
  const fullUrl = appConfig.baseUrl + appConfig.delete.removeFollow + vacationId;

  await axios
    .delete(fullUrl)
    .then((res) => console.log("deleted, status: " + res.status))
    .catch((e) => console.log(e));
};
