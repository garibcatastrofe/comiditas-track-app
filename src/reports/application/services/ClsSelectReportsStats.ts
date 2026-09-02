import { ClsBadRequestError } from "@/src/shared/domain/entities/errors/ClsBadRequestError";
import { IReportRepository } from "../../domain/interfaces/IReportRepository";
import {
  IReportFinal,
  IReportStats,
} from "../../domain/interfaces/IReportStats";

export class ClsSelectReportsStats {
  public constructor(private readonly reportRepository: IReportRepository) {}

  public async run({
    month,
    year,
  }: {
    month: number;
    year: number;
  }): Promise<IReportStats> {
    if (!month) {
      throw new ClsBadRequestError("Debe proporcionar el mes");
    }

    if (isNaN(month) || (month < 1 && month > 12)) {
      throw new ClsBadRequestError(
        "El mes debe ser un número desde 1 hasta 12",
      );
    }

    if (!year) {
      throw new ClsBadRequestError("Debe proporcionar el año");
    }

    if (isNaN(year) || (year < 1000 && year > 9999)) {
      throw new ClsBadRequestError("El año debe ser un número");
    }

    const dateInterval = this.getMonthDateRange(month, year);

    const reports = await this.reportRepository.select({
      fromDate: dateInterval.firstDay,
      toDate: dateInterval.lastDay,
    });

    const reportsFinal: IReportFinal[] = [];

    let excelentCount = 0;
    let regularCount = 0;
    let terribleCount = 0;
    let emptyCount = 0;

    const recordedDays = reports.length;
    const lastDay = this.getMonthLastDay(month, year);
    const notRecordedDays = lastDay - recordedDays;

    /* 
      Este ciclo genera un arreglo con todos los reportes del mes
      -> Crear una fecha con el año, mes y contador
      -> Busca en reports si hay un reporte con esa fecha
      -> Si lo hay, sumar contadores de status y agregarlo a reportsFinal
      -> Si no lo hay, crear un reporte con status en empty y agregarlo a reportsFinal
    */
    for (let i = 0; i < lastDay; i++) {
      const date =
        year.toString() + "-" + month.toString() + "-" + (i + 1).toString();
      const reportFound = reports.find((r) => r.date === date);

      if (reportFound) {
        if (reportFound.breakfastStatus === "excelent") excelentCount++;
        else if (reportFound.breakfastStatus === "regular") regularCount++;
        else if (reportFound.breakfastStatus === "terrible") terribleCount++;
        else emptyCount++;

        if (reportFound.lunchStatus === "excelent") excelentCount++;
        else if (reportFound.lunchStatus === "regular") regularCount++;
        else if (reportFound.dinnerStatus === "terrible") terribleCount++;
        else emptyCount++;

        if (reportFound.dinnerStatus === "excelent") excelentCount++;
        else if (reportFound.dinnerStatus === "regular") regularCount++;
        else if (reportFound.dinnerStatus === "terrible") terribleCount++;
        else emptyCount++;

        reportsFinal.push({
          id: reportFound.id,
          date: reportFound.date,
          breakfastStatus: reportFound.breakfastStatus,
          lunchStatus: reportFound.lunchStatus,
          dinnerStatus: reportFound.dinnerStatus,
          exist: true,
        });
      } else {
        reportsFinal.push({
          date,
          breakfastStatus: "empty",
          lunchStatus: "empty",
          dinnerStatus: "empty",
          exist: false,
        });
      }
    }

    let focused: string;

    if (
      excelentCount === regularCount &&
      excelentCount === terribleCount &&
      excelentCount === emptyCount &&
      regularCount === terribleCount &&
      regularCount === emptyCount &&
      terribleCount === emptyCount
    ) {
      focused = "none";
    } else if (
      excelentCount > regularCount &&
      excelentCount > terribleCount &&
      excelentCount > emptyCount
    ) {
      focused = "excelent";
    } else if (
      regularCount > excelentCount &&
      regularCount > terribleCount &&
      regularCount > emptyCount
    ) {
      focused = "regular";
    } else if (
      terribleCount > excelentCount &&
      terribleCount > regularCount &&
      terribleCount > emptyCount
    ) {
      focused = "terrible";
    } else {
      focused = "empty";
    }

    return {
      month,
      year,
      notRecordedDays: notRecordedDays.toString(),
      recordedDays: recordedDays + " de " + lastDay,
      reports: reportsFinal,
      objExcelentReport: {
        count: excelentCount,
        focused: focused === "excelent",
      },
      objRegularReport: {
        count: regularCount,
        focused: focused === "regular",
      },
      objTerribleReport: {
        count: terribleCount,
        focused: focused === "terrible",
      },
      objEmptyReport: {
        count: emptyCount,
        focused: focused === "empty",
      },
    };
  }

  private getMonthDateRange(month: number, year: number) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    return {
      firstDay: formatDate(firstDay),
      lastDay: formatDate(lastDay),
    };
  }

  private getMonthLastDay(month: number, year: number): number {
    const lastDay = new Date(year, month, 0);

    return lastDay.getDate();
  }
}
