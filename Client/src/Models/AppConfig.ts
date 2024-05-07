export type AppConfig = {
  baseUrl: string;
  get: {
    allVacations: string;
    oneVacation: string;
    oneImage: string;
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
