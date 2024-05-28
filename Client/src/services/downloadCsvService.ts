import axios from "axios";
import { FollowingsDataSetModel } from "../Models/FollowingsModel";
import { appConfig } from "../utils/appConfig";


export const downloadCsvFile = async (vacations: FollowingsDataSetModel[]) => {
    try {
      const fullUrl = appConfig.baseUrl + appConfig.post.downloadCsvFile;
      const data = await axios.post(fullUrl, vacations);
      return data;
    } catch (e: any) {
      return e.response.data;
    }
  };