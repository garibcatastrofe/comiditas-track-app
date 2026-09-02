import { IReportPrimitive } from "@/src/reports/domain/interfaces/IReportPrimitive";

export interface IReportProps extends IReportPrimitive {
  twClassName?: string;
  exist?: boolean;
  goAction: () => void;
}
