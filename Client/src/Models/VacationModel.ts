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
  id: number = 0;
  destination: string = "";
  description: string = "";
  startDate: string = "";
  endDate: string = "";
  price: number = 0;
  imageName: string = "";
}
