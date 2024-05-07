import axios from "axios";
import { LoginCredentials, UserType } from "../Models/UserModel";
import { appConfig } from "../utils/appConfig";

export const SignupUser = async (user: UserType): Promise<string> => {
  const fullUrl = appConfig.baseUrl + appConfig.post.signup;
  const data = await axios
    .post(fullUrl, user)
    .then((res) => res.data)
    .catch((e) => console.log(e));
  return data;
};

export const SigninUser = async (user: LoginCredentials): Promise<string> => {
  const fullUrl = appConfig.baseUrl + appConfig.post.signin;
  const data = await axios
    .post(fullUrl, user)
    .then((res) => res.data)
    .catch((e) => console.log(e));
  return data;
};
