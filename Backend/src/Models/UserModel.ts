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

const emailRegexPattern =
  /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

export const userValidationSchema = Joi.object({
  uid: Joi.number().integer().positive().optional(),
  firstName: Joi.string().required().min(2).max(20),
  lastName: Joi.string().required().min(2).max(20),
  email: Joi.string().max(50).required().regex(emailRegexPattern).messages({
    "string.min": "email must have at least 12 characters",
    "string.pattern.base":
      "email must have at least 12 characters and special char",
  }),
  password: Joi.string().min(4).max(25).required(),
  role: Joi.number().integer().forbidden(),
});

export const validateUser = (user: UserType) => {
  const result = userValidationSchema.validate(user);
  if (result.error) ValidationError(result.error.message);
};

export const loginValidationSchema = Joi.object({
  email: Joi.string().min(5).max(50).required(),
  password: Joi.string().min(4).max(25).required(),
});

export const validateLogin = (credentials: LoginCredentials) => {
  const result = loginValidationSchema.validate(credentials);
  if (result.error) ValidationError(result.error.message);
};
