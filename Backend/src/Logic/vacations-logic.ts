import { ResourceNotFound, ValidationError } from "../Models/ErrorModels";
import { VacationType, validateVacation } from "../Models/VacationModel";
import { executeSqlQuery } from "../Utils/dal";
import { OkPacket } from "mysql";

export const getAllVacationsLogic = async (): Promise<VacationType[]> => {
  const getAllVacationQuery = `SELECT * FROM vacations`;

  const vacation = (await executeSqlQuery(
    getAllVacationQuery
  )) as VacationType[];
  

  return vacation;
};

export const getOneVacationLogic = async (
  id: number
): Promise<VacationType> => {
  const getOneVacationQuery = `SELECT * FROM vacations WHERE vacationId = "${id}"`;

  const sqlResult = (await executeSqlQuery(
    getOneVacationQuery
  )) as VacationType[];

  if (sqlResult.length === 0) ResourceNotFound(id);

  const vacation = sqlResult[0];

  return vacation;
};

export const addOneVacationLogic = async (newVacation: VacationType): Promise<VacationType> => {
  validateVacation(newVacation);
  
  const checkVacationExistQuery = `
  SELECT * FROM vacations
  WHERE vacationId = "${newVacation.id}"
  `;

  const isVacationExists = await executeSqlQuery(checkVacationExistQuery);
  if (isVacationExists.length !== 0)
    ValidationError("Vacation is already exists.");

  const addVacationQuery = `
  INSERT INTO vacations (vacationId, destination, description, startDate, endDate, price, imageName)
  VALUES (null, "${newVacation.destination}", "${newVacation.description}", 
  "${newVacation.startDate}", "${newVacation.endDate}", 
  "${newVacation.price}", "${newVacation.imageName}")`;

  const addTheaterInfo: OkPacket = await executeSqlQuery(addVacationQuery);

  if (addTheaterInfo.affectedRows < 1) ValidationError(addTheaterInfo.message);

  newVacation.id = +addTheaterInfo.insertId;

  return newVacation;
};

export const updateVacationLogic = async ( vacation: VacationType ): Promise<VacationType> => {
  validateVacation(vacation);

  const checkVacationExistQuery = `
      SELECT * FROM vacations
      WHERE vacationId = "${vacation.id}"
      `;

  const isVacationExists = await executeSqlQuery(checkVacationExistQuery);

  if (isVacationExists.length === 0) ValidationError("Vacation is not exists.");

  const updateVacationQuery = `
      UPDATE vacations SET destination = "${vacation.destination}", description = "${vacation.description}", 
      startDate = "${vacation.startDate}", endDate = "${vacation.endDate}", 
      price = "${vacation.price}", imageName = "${vacation.imageName}"
      WHERE vacationId = "${vacation.id}"`;

  const info: OkPacket = await executeSqlQuery(updateVacationQuery);

  if (info.affectedRows <= 0) ValidationError(info.message);

  return vacation;
};

export const deleteVacationLogic = async (id: number): Promise<void> => {
  const checkVacationExistQuery = `
      SELECT * FROM vacations
      WHERE vacationId = "${id}"
      `;

  const isVacationExists = await executeSqlQuery(checkVacationExistQuery);

  if (isVacationExists.length === 0) ValidationError("Vacation is not exists");

  const deleteVacationQuery = `DELETE FROM vacations WHERE vacationId = "${id}"`;

  const info: OkPacket = await executeSqlQuery(deleteVacationQuery);

  if (info.affectedRows <= 0) ResourceNotFound(id);
};
