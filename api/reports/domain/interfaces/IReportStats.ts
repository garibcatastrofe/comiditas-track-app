import { IReportPrimitive } from "./IReportPrimitive";

export interface IReportStats {
  objExcelentReport: ReportCount;
  objRegularReport: ReportCount;
  objTerribleReport: ReportCount;
  objEmptyReport: ReportCount;
  recordedDays: string;
  notRecordedDays: string;
  month: string;
  year: string;
  reports: IReportPrimitive[];
}

interface ReportCount {
  count: number;
  focused: boolean;
}
