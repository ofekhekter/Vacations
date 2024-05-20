import axios from "axios";
import { appConfig } from "../utils/appConfig";

export const addFollow = async (userId: number, vacationId: number): Promise<string | any> => {
  try {
    const fullUrl = appConfig.baseUrl + appConfig.post.addFollow + vacationId;
    const user = {userId: userId};
    const data = await axios.post(fullUrl, user);
    return data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getAllFollowings = async (userId: number): Promise<any> => {
  const fullUrl = appConfig.baseUrl + appConfig.get.allFollowings + userId;
  try {
    const data = await axios.get(fullUrl);
    return data.data;
  } catch (e: any) {
    console.error(e.response.data);
  }
};

export const deleteFollow = async (userId: number, vacationId: number): Promise<void> => {
  const fullUrl = appConfig.baseUrl + appConfig.delete.removeFollow + vacationId + "/" + userId;

  await axios
    .delete(fullUrl)
    .then((res) => console.log("deleted, status: " + res.status))
    .catch((e) => console.log(e));
};
