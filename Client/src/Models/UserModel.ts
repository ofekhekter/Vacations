export type RoleType = 1 | 2;

export type LoginCredentials = {
  username: string;
  password: string;
};

export type UserType = {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: RoleType;
};