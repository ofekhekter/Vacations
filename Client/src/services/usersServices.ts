import axios from "axios";
import { LoginCredentials, UserType } from "../Models/UserModel";
import { appConfig } from "../utils/appConfig";

export const SignupUser = async (user: UserType): Promise<any> => {
  try {
    const fullUrl = appConfig.baseUrl + appConfig.post.signup;
    const data = await axios.post(fullUrl, user);
    return data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const SigninUser = async (user: LoginCredentials) => {
  const fullUrl = appConfig.baseUrl + appConfig.post.signin;
  const data = await axios
    .post(fullUrl, user)
    .then((res) => res.data)
    .catch((e) => console.log(e));
  return data;
};

export const checkIsAdmin = async (email: { email: string }): Promise<any> => {
  try {
    const fullUrl = appConfig.baseUrl + appConfig.post.isAdmin;
    const data = await axios.post(fullUrl, email);
    return data.data;
  } catch (e: any) {
    console.error(e.response.data);
  }
};

export const getUserId = async (email: string): Promise<number | any> => {
  try {
    const fullUrl = appConfig.baseUrl + appConfig.get.getUserId + email;
    const data = await axios.get(fullUrl);
    return data.data;
  } catch (e: any) {
    console.error(e.response.data);
  }
};

export const getUserByToken = async (token: string): Promise<number | any> => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const fullUrl = appConfig.baseUrl + appConfig.get.getUserByToken;
    const data = await axios.get(fullUrl, config);
    return data.data;
  } catch (e: any) {
    console.error(e.response.data);
  }
};
