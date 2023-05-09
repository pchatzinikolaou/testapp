import { ICompany } from "../company/Company.model";

export interface IEmployee {
  id?: number;
  name?: string;
  surName?: string;
  email?: string;
  startDate?: Date;
  vacationDays?: number;
  salary?: number;
  employmentType?: string;
  employeeCompany?: ICompany;
}
