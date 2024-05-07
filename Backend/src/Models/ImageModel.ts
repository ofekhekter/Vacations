import { UploadedFile } from "express-fileupload";

export type ImageFileModel = {
    imageFile: UploadedFile;
}