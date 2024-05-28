import { createWriteStream } from "fs";
import { join } from "path";
import { format } from "fast-csv";
import { FollowingsDataSetModel } from "../Models/FollowingsModel";

const destinations = [
  { destination: "Paris", followers: 1200 },
  { destination: "New York", followers: 950 },
  { destination: "Tokyo", followers: 800 },
  { destination: "Sydney", followers: 450 },
];

export const createCSV = (vacations: FollowingsDataSetModel[]) => {
  return new Promise<void>((resolve, reject) => {
    const filePath = join(__dirname, "destinations.csv");
    const ws = createWriteStream(filePath);

    format({ headers: true })
      .on("error", (err) => reject(err))
      .on("finish", () => resolve())
      .pipe(ws);

    destinations.forEach((destination) => {
      ws.write(destination);
    });

    ws.end();
  });
};
