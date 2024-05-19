import axios from "axios";
import { appConfig } from "../utils/appConfig";

export const getOneImage = async (imageName: string): Promise<Buffer> => {
  const fullUrl = appConfig.baseUrl + appConfig.get.oneImage + imageName;
  const data = await axios
    .get(fullUrl)
    .then((res) => res.data)
    .catch((e) => console.log(e));
  return data as Buffer;
};

export const addOneImage = async (imageName: string, imageFile: File): Promise<void> => {
  const fullUrl = `${appConfig.baseUrl}${appConfig.post.addOneImage}`;
  const formData = new FormData();
  formData.append('imageName', imageName);
  formData.append('imageFile', imageFile);
  try {
    const response = await axios.post(fullUrl, formData);
    console.log('Image uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Error uploading image');
  }
};

export const deleteImage = async (imageName: string): Promise<void> => {
  const fullUrl = appConfig.baseUrl + appConfig.delete.removeImage + imageName;
  try {
    const response = await axios.delete(fullUrl);
    console.log('Image deleted successfully:', response);
  } catch (error) {
    console.error('Error deleted image:', error);
    throw new Error('Error deleted image');
  }
};

export const getImageFile = async (imageSrc: string): Promise<File> => {
  const response = await fetch(imageSrc);
  const blob = await response.blob();
  const file = new File([blob], "image.jpg", { type: "image/jpeg" });
  return file;
}