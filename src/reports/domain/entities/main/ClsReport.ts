import { ClsReportDate } from "../valueObjects/ClsReportDate";
import { ClsReportMealStatus } from "../valueObjects/ClsReportMealStatus";

export class ClsReport {
  public reportDate: ClsReportDate;
  public reportBreakfastStatus: ClsReportMealStatus;
  public reportLunchStatus: ClsReportMealStatus;
  public reportDinnerStatus: ClsReportMealStatus;

  public constructor(
    date: ClsReportDate,
    breakfastStatus: ClsReportMealStatus,
    lunchStatus: ClsReportMealStatus,
    dinnerStatus: ClsReportMealStatus,
  ) {
    this.reportDate = date;
    this.reportBreakfastStatus = breakfastStatus;
    this.reportLunchStatus = lunchStatus;
    this.reportDinnerStatus = dinnerStatus;
  }
}
