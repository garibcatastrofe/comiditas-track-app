import { ClsReport } from "../../domain/entities/main/ClsReport";
import { ClsReportDate } from "../../domain/entities/valueObjects/ClsReportDate";
import { ClsReportMealStatus } from "../../domain/entities/valueObjects/ClsReportMealStatus";
import { IReportPrimitive } from "../../domain/interfaces/IReportPrimitive";
import { IReportRepository } from "../../domain/interfaces/IReportRepository";
import { ClsReportMapper } from "../mappers/ClsReportMapper";
import { ClsReportPartialValidator } from "../validators/ClsReportPartialValidator";

export class ClsUpdateReport {
  public constructor(private readonly reportRepository: IReportRepository) {}

  public async run({
    date,
    report,
  }: {
    date: string;
    report: IReportPrimitive;
  }): Promise<void> {
    const dateVerified = new ClsReportDate(date);

    /* Buscar reporte por fecha */
    const reportFound = await this.reportRepository.selectByDate(
      dateVerified.value,
    );

    const objReport = new ClsReport(
      dateVerified,
      new ClsReportMealStatus(report.breakfastStatus),
      new ClsReportMealStatus(report.lunchStatus),
      new ClsReportMealStatus(report.dinnerStatus),
    );

    /* Si el reporte existe actualizarlo, si no, crearlo */
    if (reportFound) {
      const reportBeforeValidation = {
        breakfastStatus: report.breakfastStatus,
        lunchStatus: report.lunchStatus,
        dinnerStatus: report.dinnerStatus,
      };

      const reportValidated = ClsReportPartialValidator.validateData(
        reportBeforeValidation,
      );

      if (Object.keys(reportValidated).length > 0) {
        await this.reportRepository.update(report.date ?? 0, reportValidated);
      }

      return;
    }

    await this.reportRepository.insert(ClsReportMapper.toPrimitive(objReport));
  }
}
