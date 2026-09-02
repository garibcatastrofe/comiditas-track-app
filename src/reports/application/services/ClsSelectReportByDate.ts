import { ClsReportDate } from "../../domain/entities/valueObjects/ClsReportDate";
import { IReportPrimitive } from "../../domain/interfaces/IReportPrimitive";
import { IReportRepository } from "../../domain/interfaces/IReportRepository";

export class ClsSelectReportByDate {
  public constructor(private readonly reportRepository: IReportRepository) {}

  public async run({
    date,
  }: {
    date: string;
  }): Promise<IReportPrimitive | null> {
    const dateVerified = new ClsReportDate(date);

    const reportFound = await this.reportRepository.selectByDate(
      dateVerified.value,
    );

    if (!reportFound) {
      return null;
    }

    return reportFound;
  }
}
