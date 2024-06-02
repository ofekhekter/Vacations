export type AppConfig = {
  baseUrl: string;
  get: {
    allVacations: string;
    oneVacation: string;
    allFutureVacations: string;
    allCurrentVacations: string;
    allFollowings: string;
    oneImage: string;
    getUserId: string;
    getUserByToken: string;
  };
  post: {
    vacation: string;
    signup: string;
    signin: string;
    addOneImage: string;
    isAdmin: string;
    addFollow: string;
    checkLegalDates: string;
    downloadCsvFile: string;
  };
  update: {
    vacation: string;
  };
  delete: {
    vacation: string;
    removeImage: string;
    removeFollow: string;
  };
};
