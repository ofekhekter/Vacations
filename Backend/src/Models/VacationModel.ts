import Joi from "Joi";
import { ValidationError } from "./ErrorModels";

export type VacationType = {
  id: number;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  imageName: string;
};

export const vacationValidationSchema = Joi.object({
  id: Joi.number().optional().positive().integer(),
  destination: Joi.string().required().min(2).max(20),
  description: Joi.string().required().min(10).max(2000),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  price: Joi.number().required().positive().integer().max(10000),
  imageName: Joi.string().optional().min(2).max(50),
});

export const validateVacation = (vacation: VacationType): void => {
  const result = vacationValidationSchema.validate(vacation);
  if (result.error) ValidationError(result.error.message);
};
