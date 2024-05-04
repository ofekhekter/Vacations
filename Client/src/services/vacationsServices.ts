import axios from "axios";
import { appConfig } from "../utils/appConfig";
import { VacationType } from "../Models/VacationModel";


export const getAllVacations = async (): Promise<VacationType[]> => {
  const fullUrl = appConfig.baseUrl + appConfig.get.allVacations;

  const data = await axios
    .get(fullUrl)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return data ? data as VacationType[] : [];
};

export const getOneVacation = async (id: string): Promise<VacationType> => {
  const fullUrl = appConfig.baseUrl + appConfig.get.oneVacation + id;

  const data = await axios
    .get(fullUrl)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return data as VacationType;
};

export const addVacation = async (vacation: VacationType): Promise<VacationType> => {
    const fullUrl = appConfig.baseUrl + appConfig.post.vacation;
    const formData = new FormData().append(
      "Vacation",
      JSON.stringify(vacation)
    );
    const data = await axios
      .post(fullUrl, formData)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  
    return data as VacationType;
  };
  
  export const updateVacation = async (vacation: VacationType): Promise<VacationType> => {
    const fullUrl = appConfig.baseUrl + appConfig.update.vacation + vacation.id;
    const formData = new FormData().append(
      "Vacation",
      JSON.stringify(vacation)
    );
    const data = await axios
      .put(fullUrl, formData)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  
    return data as VacationType;
  };
  
  export const deleteVacation = async (id: string): Promise<void> => {
    const fullUrl = appConfig.baseUrl + appConfig.delete.vacation + id;
  
    await axios
      .delete(fullUrl)
      .then((res) => console.log("deleted, status: " + res.status))
      .catch((e) => console.log(e));
  };
  