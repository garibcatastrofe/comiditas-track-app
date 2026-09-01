import { ClsReport } from "../../domain/entities/main/ClsReport";
import { ClsReportDate } from "../../domain/entities/valueObjects/ClsReportDate";
import { ClsReportMealStatus } from "../../domain/entities/valueObjects/ClsReportMealStatus";
import { IReportPrimitive } from "../../domain/interfaces/IReportPrimitive";
import { IReportRepository } from "../../domain/interfaces/IReportRepository";
import { ClsReportMapper } from "../mappers/ClsReportMapper";

export class ClsInsertReport {
  public constructor(private readonly reportRepository: IReportRepository) {}

  public async run({
    date,
    breakfastStatus,
    lunchStatus,
    dinnerStatus,
  }: Omit<IReportPrimitive, "id">): Promise<IReportPrimitive> {
    const dateVerified = new ClsReportDate(date);

    /* Buscar reporte por fecha */
    const reportFound = await this.reportRepository.selectByDate(
      dateVerified.value,
    );

    const objReport = new ClsReport(
      dateVerified,
      new ClsReportMealStatus(breakfastStatus),
      new ClsReportMealStatus(lunchStatus),
      new ClsReportMealStatus(dinnerStatus),
    );

    /* Si el reporte existe retornarlo, si no, crearlo y retornarlo */
    if (reportFound) {
      return reportFound;
    }

    const newReport = await this.reportRepository.insert(
      ClsReportMapper.toPrimitive(objReport),
    );

    return newReport;
  }
}
