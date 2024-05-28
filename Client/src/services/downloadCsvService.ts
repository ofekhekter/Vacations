import axios from "axios";
import { FollowingsDataSetModel } from "../Models/FollowingsModel";
import { appConfig } from "../utils/appConfig";

export const downloadCsvFile = async (vacations: FollowingsDataSetModel[]) => {
  try {
    const fullUrl = appConfig.baseUrl + appConfig.post.downloadCsvFile;
    const response = await axios.post(fullUrl, vacations, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw new Error("Error downloading CSV: " + error);
  }
};
