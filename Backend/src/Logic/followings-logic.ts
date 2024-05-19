import { ResourceNotFound, ValidationError } from "../Models/ErrorModels";
import { executeSqlQuery } from "../Utils/dal";
import { OkPacket } from "mysql";

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

export const deletefollowingLogic = async (userId: number, vacationId: number): Promise<void> => {
  const checkfollowingExistQuery = `
      SELECT * FROM followings
      WHERE vacationId = "${vacationId}" AND userId = "${userId}"`;

  const isFollowingExists = await executeSqlQuery(checkfollowingExistQuery);

  if (isFollowingExists.length === 0) ValidationError("following is not exists");

  const deleteFollowingQuery = `DELETE FROM followings WHERE vacationId = "${vacationId}"`;

  const info: OkPacket = await executeSqlQuery(deleteFollowingQuery);

  if (info.affectedRows <= 0) ResourceNotFound(vacationId);
};
