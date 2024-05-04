export type AppConfig = {
  baseUrl: string;
  get: {
    oneVacation: string;
    allVacations: string;
  };
  post: {
    vacation: string;
    signup: string;
    signin: string;
  };
  update: {
    vacation: string;
  };
  delete: {
    vacation: string;
  };
};
