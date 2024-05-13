export type VacationType = {
  id: number;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  imageName: string;
};

export class VacationFormModel {
  destination: string = "";
  description: string = "";
  startDate: string = "";
  endDate: string = "";
  price: number = 0;
  imageName: string = "";
  image: HTMLImageElement = null;
}
