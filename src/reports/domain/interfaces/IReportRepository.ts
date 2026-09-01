import { IReportPrimitive } from "./IReportPrimitive";
import { IReportStats } from "./IReportStats";

export interface IReportRepository {
  insert(report: IReportPrimitive): Promise<IReportPrimitive>;
  update(id: number, report: Partial<IReportPrimitive>): Promise<void>;
  select(query: { month: string; year: string }): Promise<IReportStats>;
  selectByDate(date: string): Promise<IReportPrimitive | null>;
}
