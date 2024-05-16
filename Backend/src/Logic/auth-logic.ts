import { UnauthorizedError } from "./../Models/ErrorModels";
import { OkPacket } from "mysql";
import { LoginCredentials, UserType, validateLogin, validateUser } from "../Models/UserModel";
import { executeSqlQuery } from "../Utils/dal";
import { getNewToken } from "../Utils/cyber";

export const signupUserLogic = async (user: UserType): Promise<string> => {
  validateUser(user);
  const checkUsernameQuery = `SELECT * FROM users WHERE email = '${user.email}'`;
  
  const checkUsername = await executeSqlQuery(checkUsernameQuery);
  if (checkUsername.length >= 1) UnauthorizedError("User is already exists");

  const sqlQuery = `
  INSERT INTO users (userId, email, firstName, lastName, password, role) VALUES (null, '${user.email}', '${user.firstName}', '${user.lastName}','${user.password}', 1)`;

  const info: OkPacket = await executeSqlQuery(sqlQuery);
  console.log("info", info);
  if (info.affectedRows === 0)
    UnauthorizedError("Error in signup sql query: " + info.message);
  user.userId = +info.insertId;
  const token = getNewToken(user);
  return token;
};

export const loginUserLogic = async (
  login: LoginCredentials
): Promise<string> => {
  validateLogin(login);

  const getUserQuery = `
    SELECT * FROM users
    WHERE email = '${login.email}' 
    AND password = '${login.password}'
    `;

  const userArray = await executeSqlQuery(getUserQuery);

  if (userArray.length === 0) UnauthorizedError("incorrect email or password ");

  const user: UserType = userArray[0];

  const token = getNewToken(user);

  return token;
};

export const isAdminLogic = async (email: string): Promise<boolean> => {
  let isAdmin: boolean = false;
  const query = `SELECT * FROM users WHERE email = '${email}' AND role = '2'`;
  const result = await executeSqlQuery(query);
  if (result.length > 0) isAdmin = true;
  return isAdmin;
};
