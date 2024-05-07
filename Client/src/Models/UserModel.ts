export type RoleType = 1 | 2;

export type LoginCredentials = {
  email: string;
  password: string;
};

export type UserType = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleType;
};