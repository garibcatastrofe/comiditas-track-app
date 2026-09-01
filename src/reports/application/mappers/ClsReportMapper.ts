import { ClsReport } from "../../domain/entities/main/ClsReport";
import { IReportPrimitive } from "../../domain/interfaces/IReportPrimitive";

export class ClsReportMapper {
  public static toPrimitive(report: ClsReport): IReportPrimitive {
    return {
      date: report.reportDate.value,
      breakfastStatus: report.reportBreakfastStatus.value,
      lunchStatus: report.reportLunchStatus.value,
      dinnerStatus: report.reportDinnerStatus.value,
    };
  }
}
