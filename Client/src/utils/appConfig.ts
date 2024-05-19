import { AppConfig } from "../Models/AppConfig";

export const appConfig: AppConfig = {
  baseUrl: "http://localhost:3001/api",
  get: {
    allVacations: "/vacations",
    oneVacation: "/vacations/",
    oneImage: "/images/",
  },
  post: {
    vacation: "/vacations",
    signup: "/auth/signup",
    signin: "/auth/signin",
    addOneImage: "/images",
    isAdmin: "/auth/isadmin",
  },
  delete: {
    vacation: "/vacations/",
    removeImage: "/images/",
  },
  update: {
    vacation: "/vacations/",
  },
};
