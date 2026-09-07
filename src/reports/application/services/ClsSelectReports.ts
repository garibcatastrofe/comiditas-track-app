import { ClsDate } from "@/src/shared/domain/entities/date/ClsDate";
import { IReportPrimitive } from "../../domain/interfaces/IReportPrimitive";
import { IReportRepository } from "../../domain/interfaces/IReportRepository";

export class ClsSelectReports {
  public constructor(private readonly reportRepository: IReportRepository) {}

  public async run({
    date,
    type,
  }: {
    date: Date;
    type: "monthly" | "annual";
  }): Promise<IReportPrimitive[]> {
    const objDate = new ClsDate();

    let fromDate: string;
    let toDate: string;

    if (type === "monthly") {
      const monthRange = objDate.getMonthDateRange({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
      fromDate = monthRange.firstDay;
      toDate = monthRange.lastDay;
    } else {
      fromDate = `${date.getFullYear()}-01-01`;
      toDate = `${date.getFullYear()}-12-31`;
    }

    return this.reportRepository.select({ fromDate, toDate });
  }
}
