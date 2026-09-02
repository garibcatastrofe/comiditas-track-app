import { IReportPrimitive } from "./IReportPrimitive";

export interface IReportRepository {
  insert(report: IReportPrimitive): Promise<IReportPrimitive>;
  update(id: number, report: Partial<IReportPrimitive>): Promise<void>;
  select(query: {
    fromDate: string;
    toDate: string;
  }): Promise<IReportPrimitive[]>;
  selectByDate(date: string): Promise<IReportPrimitive | null>;
}
