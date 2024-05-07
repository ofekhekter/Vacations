import Joi from "Joi";
import { ValidationError } from "./ErrorModels";

export type UserResponse = {
  uid: number;
  firstName: string;
  lastName: string;
  username: string;
  role: RoleType;
  token: string;
};

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

export const userValidationSchema = Joi.object({
  uid: Joi.number().integer().positive().optional(),
  firstName: Joi.string().required().min(2).max(20),
  lastName: Joi.string().required().min(2).max(20),
  username: Joi.string().max(50).required(),
  password: Joi.string().max(25).required(),
  role: Joi.forbidden(),
});

export const validateUser = (user: UserType) => {
  const result = userValidationSchema.validate(user);
  if (result.error) ValidationError(result.error.message);
};

export const loginValidationSchema = Joi.object({
  username: Joi.string().min(5).max(50).required(),
  password: Joi.string().min(8).max(25).required(),
});

export const validateLogin = (credentials: LoginCredentials) => {
  const result = loginValidationSchema.validate(credentials);
  if (result.error) ValidationError(result.error.message);
};
