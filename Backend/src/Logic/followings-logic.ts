import { ResourceNotFound, ValidationError } from "../Models/ErrorModels";
import { executeSqlQuery } from "../Utils/dal";
import mysql, { OkPacket } from 'mysql';

export const addfollowingLogic = async (userId: number, vacationId: number): Promise<void> => {
  const checkfollowingExistQuery = `
    SELECT * FROM followings
    WHERE vacationId = "${vacationId}" AND userId = "${userId}"`;

  const isFollowingExists = await executeSqlQuery(checkfollowingExistQuery);
  if (isFollowingExists.length === 0) {
    const addFollowingQuery = `
      INSERT INTO followings (userId, vacationId)
      VALUES ("${userId}", "${vacationId}")`;

    const addTheaterInfo: OkPacket = await executeSqlQuery(addFollowingQuery);
    if (addTheaterInfo.affectedRows < 1) ValidationError(addTheaterInfo.message);
  } else {
    ValidationError("following is already exists");
  }
};

export const getAllFollowingsLogic = async (userId: number): Promise<any> => {
  const query = `SELECT vacationId FROM followings WHERE userId = '${userId}'`;
  const result = await executeSqlQuery(query);
  if (result.length === 0) ResourceNotFound(userId);
  return result;
};

export const deletefollowingLogic = async (userId: number, vacationId: number): Promise<void> => {
  const escapedUserId = mysql.escape(userId);
  const escapedVacationId = mysql.escape(vacationId);

  const checkfollowingExistQuery = `
      SELECT * FROM followings
      WHERE vacationId = ${escapedVacationId} AND userId = ${escapedUserId}`;

  const isFollowingExists = await executeSqlQuery(checkfollowingExistQuery);

  if (isFollowingExists.length === 0) ValidationError("Following does not exist");

  const deleteFollowingQuery = `DELETE FROM followings WHERE vacationId = ${escapedVacationId} AND userId = ${escapedUserId}`;

  const info: any = await executeSqlQuery(deleteFollowingQuery);
  if (info.affectedRows <= 0) ResourceNotFound(vacationId);
};
