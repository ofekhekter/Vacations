import axios from "axios";
import { appConfig } from "../utils/appConfig";
import { VacationType } from "../Models/VacationModel";

export const getAllImageNames = async (): Promise<string[] | []> => {
  const fullUrl = `${appConfig.baseUrl}${appConfig.get.allVacations}`;
  try {
    const response = await axios.get(fullUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllVacations = async (currentPage: number, userId: number): Promise<{ vacations: VacationType[], totalCount: number }> => {
  const fullUrl = `${appConfig.baseUrl}${appConfig.get.allVacations}${currentPage}/${userId}`;
  try {
    const response = await axios.get(fullUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    return { vacations: [], totalCount: 0 };
  }
};

export const getAllFutureVacations = async (): Promise< VacationType[]> => {
  const fullUrl = `${appConfig.baseUrl}${appConfig.get.allFutureVacations}`;
  try {
    const vacations = await axios.get(fullUrl);
    return vacations.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllCurrentVacations = async (): Promise< VacationType[]> => {
  const fullUrl = `${appConfig.baseUrl}${appConfig.get.allCurrentVacations}`;
  try {
    const vacations = await axios.get(fullUrl);
    return vacations.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllVacationsByUserId = async (userId: number): Promise<VacationType[]> => {
  const fullUrl = `${appConfig.baseUrl}${appConfig.get.allVacations}${userId}`;
  try {
    const vacations = await axios.get(fullUrl);
    return vacations.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getOneVacation = async (id: string): Promise<VacationType> => {
  const fullUrl = appConfig.baseUrl + appConfig.get.allVacations + id;
  const data = await axios
    .get(fullUrl)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return data as VacationType;
};

export const addVacation = async (vacation: VacationType): Promise<VacationType | any> => {
  try {
    const fullUrl = appConfig.baseUrl + appConfig.post.vacation;
    const data = await axios.post(fullUrl, vacation);
    return data;
  } catch (e: any) {
    if (e.response && e.response.data) {
      return e.response.data;
    } else {
      return 'An unknown error occurred';
    }
  }
};

export const updateVacation = async (vacation: VacationType, vacationId: number): Promise<VacationType | any> => {
  try {
    const fullUrl = appConfig.baseUrl + appConfig.update.vacation + vacationId;
    const data = await axios.put(fullUrl, vacation);
    return data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const deleteVacation = async (id: string, token: string): Promise<void> => {
  const fullUrl = appConfig.baseUrl + appConfig.delete.vacation + id;
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  await axios
    .delete(fullUrl, config)
    .then((res) => console.log("deleted, status: " + res.status))
    .catch((e) => console.log(e));
};
