import { ResourceNotFound, ValidationError } from "../Models/ErrorModels";
import { VacationType, validateVacation } from "../Models/VacationModel";
import { executeSqlQuery, executeSqlQueryWithParams } from "../Utils/dal";
import { OkPacket } from "mysql";

export const getAllVacationsLogic = async (): Promise<string[]> => {
  const getAllVacationQuery = `SELECT imageName FROM vacations`;
  const vacationsResult = await executeSqlQuery(getAllVacationQuery);
  if (vacationsResult.length > 0) {
    const vacationNames: string[] = vacationsResult.map((vacation: any) => vacation.imageName);
    return vacationNames;
  } else return [];
};

export const getAllVacationsByIdLogic = async (userId: number): Promise<VacationType[]> => {
  const getAllVacationQuery = `
    SELECT v.*
    FROM vacations v
    JOIN followings f ON v.vacationId = f.vacationId
    WHERE f.userId = ?`;

  const vacationsResult = await executeSqlQueryWithParams(getAllVacationQuery, [userId]);
  if (vacationsResult.length > 0) {
    return vacationsResult;
  } else return [];
};

export const getAllFutureVacationsLogic = async (): Promise<VacationType[]> => {
  const getAllVacationQuery = `SELECT * FROM vacations WHERE startDate > CURDATE()`;
  const vacationsResult = await executeSqlQuery(getAllVacationQuery);
  if (vacationsResult.length > 0) {
    return vacationsResult;
  } else return [];
};

export const getAllCurrentVacationsLogic = async (): Promise<VacationType[]> => {
  const getAllVacationQuery = `SELECT * FROM vacations WHERE startDate <= CURDATE() AND endDate >= CURDATE()`;
  const vacationsResult = await executeSqlQuery(getAllVacationQuery);
  if (vacationsResult.length > 0) {
    return vacationsResult;
  } else return [];
};

export const getAllVacationsOffsetLogic = async (page: number, userId: number): Promise<{ vacations: VacationType[], totalCount: number }> => {
  const limit = 10;
  const offset = (page - 1) * limit;

  const getAllVacationQuery = `WITH FollowedVacations AS (
    SELECT vacationId
    FROM followings
    WHERE userId = '${userId}'
)
SELECT v.*, fv.vacationId AS followedVacationId
FROM vacations v
LEFT JOIN FollowedVacations fv ON v.vacationId = fv.vacationId
LIMIT ${limit} OFFSET ${offset};`;

  const getTotalCountQuery = `SELECT COUNT(*) as totalCount FROM vacations`;

  const [vacations, totalCountResult] = await Promise.all([
    executeSqlQuery(getAllVacationQuery) as Promise<VacationType[]>,
    executeSqlQuery(getTotalCountQuery)
  ]);

  const totalCount = (totalCountResult[0] as { totalCount: number }).totalCount;

  // Function to convert date to Israel time without shifting days
  const toIsraelDate = (date: string): string => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Convert the startDate and endDate to Israel time format without shifting days
  const vacationsWithIsraelTime = vacations.map(vacation => ({
    ...vacation,
    startDate: toIsraelDate(vacation.startDate),
    endDate: toIsraelDate(vacation.endDate)
  }));

  return {
    vacations: vacationsWithIsraelTime,
    totalCount
  };
};

export const getOneVacationLogic = async (id: number): Promise<VacationType> => {
  const getOneVacationQuery = `SELECT * FROM vacations WHERE vacationId = "${id}"`;

  const sqlResult = (await executeSqlQuery(getOneVacationQuery)) as VacationType[];

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

export const updateVacationLogic = async (vacation: VacationType): Promise<VacationType> => {
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

export const checkLegalDates = async (dates: { startDate: string, endDate: string }): Promise<boolean> => {
  const query = `
    SELECT CASE
      WHEN STR_TO_DATE('${dates.startDate}', '%Y-%m-%d') < STR_TO_DATE('${dates.endDate}', '%Y-%m-%d') THEN TRUE
      ELSE FALSE
    END AS isValid;
  `;

  try {
    const result = await executeSqlQuery(query);
    return result[0].isValid === 1;
  } catch (error) {
    console.error("Error checking dates:", error);
    return false;
  }
}
