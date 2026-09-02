import { IReportPrimitive } from "./IReportPrimitive";

export interface IReportStats {
  objExcelentReport: ReportCount;
  objRegularReport: ReportCount;
  objTerribleReport: ReportCount;
  objEmptyReport: ReportCount;
  recordedDays: string;
  notRecordedDays: string;
  month: number;
  year: number;
  reports: IReportFinal[];
}

export interface ReportCount {
  count: number;
  focused: boolean;
}

export interface IReportFinal extends IReportPrimitive {
  exist: boolean;
}
