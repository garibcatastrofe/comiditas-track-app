import { IReportPrimitive } from "@/api/reports/domain/interfaces/IReportPrimitive";

export interface IReportProps extends IReportPrimitive {
  twClassName?: string;
  goAction: () => void;
}
