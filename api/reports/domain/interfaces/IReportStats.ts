import { IReportPrimitive } from "./IReportPrimitive";

export interface IReportStats {
  objExcelentReport: ReportCount;
  objRegularReport: ReportCount;
  objTerribleReport: ReportCount;
  objEmptyReport: ReportCount;
  recordedDays: number;
  notRecordedDays: number;
  month: string;
  year: string;
  reports: IReportPrimitive[];
}

interface ReportCount {
  count: number;
  focused: boolean;
}
