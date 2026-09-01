import { ClsReportDate } from "../../domain/entities/valueObjects/ClsReportDate";
import { ClsReportMealStatus } from "../../domain/entities/valueObjects/ClsReportMealStatus";
import { IReportPrimitive } from "../../domain/interfaces/IReportPrimitive";

export class ClsReportPartialValidator {
  public static validateData(
    report: Partial<IReportPrimitive> | undefined,
  ): Partial<IReportPrimitive> {
    const validatedReport: Partial<IReportPrimitive> = {};

    if (report?.date !== undefined) {
      validatedReport.date = new ClsReportDate(report.date).value;
    }

    if (report?.breakfastStatus !== undefined) {
      validatedReport.breakfastStatus = new ClsReportMealStatus(
        report.breakfastStatus,
      ).value;
    }

    if (report?.lunchStatus !== undefined) {
      validatedReport.lunchStatus = new ClsReportMealStatus(
        report.lunchStatus,
      ).value;
    }

    if (report?.dinnerStatus !== undefined) {
      validatedReport.dinnerStatus = new ClsReportMealStatus(
        report.dinnerStatus,
      ).value;
    }

    return validatedReport;
  }
}
