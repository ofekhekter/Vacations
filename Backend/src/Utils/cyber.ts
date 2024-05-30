import jwt from "jsonwebtoken";
import { Request } from "express";
import { UserType } from "../Models/UserModel";
import { UnauthorizedError } from "../Models/ErrorModels";

interface UserContainer {
  user: UserType;
}

const secretKey = "wowwww, what a secret!";

export const getNewToken = (user: UserType): string => {
  const userContainer: UserContainer = { user };
  const options = { expiresIn: "3h" };
  const token = jwt.sign(userContainer, secretKey, options);
  return token;
};

export const verifyToken = (req: Request): Promise<boolean> => {
  return new Promise<boolean>((res, rej) => {
    try {
      const header = req.header("authorization");
      if (!header) {
        res(false);
        return;
      }
      const token = header.substring(7);
      if (!token) {
        res(false);
        return;
      }
      jwt.verify(token, secretKey, (err) => {
        if (err) {
          res(false);
          return;
        }
        res(true);
      });
    } catch (err) {
      rej(err);
    }
  });
};

export const verifyAdmin = async (req: Request): Promise<boolean> => {
  const isLoggedIn = await verifyToken(req);
  if (isLoggedIn === false) return false;
  const header = req.header("authorization");
  const token = header.substring(7);
  const container = jwt.decode(token) as UserContainer;
  const user = container.user;
  return user.role === 2;
};

export const getCurrentUser = async (request: Request): Promise<UserType> => {
  try {
    const isLoggedIn = await verifyToken(request);
    if (!isLoggedIn) {
      UnauthorizedError("Not logged in");
    }
    const header = request.header("authorization");
    const token = header.substring(7);
    const container = jwt.decode(token) as UserContainer;
    return container.user;
  } catch (error) {
    throw error;
  }
};
