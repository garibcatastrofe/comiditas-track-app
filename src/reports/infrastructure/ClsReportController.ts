import { IResponse } from "@/src/shared/domain/interfaces/IResponse";
import { handleServerError } from "@/src/shared/domain/utils/handleServerError";
import { ServiceContainer } from "@/src/shared/infrastructure/ServiceContainer";
import { IReportPrimitive } from "../domain/interfaces/IReportPrimitive";
import { IReportStats } from "../domain/interfaces/IReportStats";

const { reports } = ServiceContainer;

export class ClsReportController {
  public async insertReport({
    date,
    breakfastStatus,
    lunchStatus,
    dinnerStatus,
  }: Omit<IReportPrimitive, "id">): Promise<{
    message: string;
    ok: boolean;
    report: IReportPrimitive;
  }> {
    try {
      const report = await reports.insert.run({
        date,
        breakfastStatus,
        lunchStatus,
        dinnerStatus,
      });
      return {
        message: "Reporte agregado correctamente",
        ok: true,
        report,
      };
    } catch (error) {
      console.log("Error: " + error);
      return {
        message: "Error al agregar el reporte",
        ok: false,
        report: {
          date: "",
          breakfastStatus: "empty",
          lunchStatus: "empty",
          dinnerStatus: "empty",
        },
      };
    }
  }

  public async selectReportByDate({ date }: { date: string }): Promise<{
    message: string;
    ok: boolean;
    report: IReportPrimitive | null;
  }> {
    try {
      const report = await reports.selectByDate.run({ date });
      return {
        message: report
          ? "Reporte encontrado correctamente"
          : "No se encontró ningún reporte en esa fecha",
        ok: true,
        report,
      };
    } catch (error) {
      console.log("Error: " + error);
      return {
        message: "Error al seleccionar el reporte por fecha",
        ok: false,
        report: null,
      };
    }
  }

  public async selectReportStats({
    month,
    year,
  }: {
    month: number;
    year: number;
  }): Promise<{ message: string; ok: boolean; stats: IReportStats }> {
    try {
      const stats = await reports.select.run({ month, year });
      return {
        message: "Estadísticas encontradas correctamente",
        ok: true,
        stats,
      };
    } catch (error) {
      console.log("Error: " + error);
      return {
        message: "Error al buscar las estadísticas",
        ok: false,
        stats: {
          month,
          year,
          notRecordedDays: "0",
          recordedDays: "0",
          objEmptyReport: { count: 0, focused: false },
          objExcelentReport: { count: 0, focused: false },
          objRegularReport: { count: 0, focused: false },
          objTerribleReport: { count: 0, focused: false },
          reports: [],
        },
      };
    }
  }

  public async updateReport({
    date,
    report,
  }: {
    date: string;
    report: IReportPrimitive;
  }): Promise<IResponse> {
    try {
      await reports.update.run({ date, report });
      return {
        message: "Reporte actualizado correctamente",
        ok: true,
      };
    } catch (error) {
      return handleServerError(error);
    }
  }
}
