import { createWriteStream } from "fs";
import { join } from "path";
import { format } from "fast-csv";
import { FollowingsDataSetModel } from "../Models/FollowingsModel";

export const createCSV = (vacations: FollowingsDataSetModel[]) => {
  return new Promise<string>((resolve, reject) => {
    const filePath = join(__dirname, "..", "Assets", "reports", "destinations.csv");
    const ws = createWriteStream(filePath);
    const csvStream = format({ headers: true });

    csvStream.pipe(ws)
      .on("error", (err) => reject(err))
      .on("finish", () => resolve(filePath));

    vacations.forEach((destination) => {
      csvStream.write(destination);
    });

    csvStream.end();
  });
};
