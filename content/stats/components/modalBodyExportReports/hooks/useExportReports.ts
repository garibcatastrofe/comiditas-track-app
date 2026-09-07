import { useAnnouncement } from "@/content/shared/components/announcement/stores/announcementStore";
import { useDownload } from "@/content/stats/stores/downloadStore";
import { IReportPrimitive } from "@/src/reports/domain/interfaces/IReportPrimitive";
import { ClsReportController } from "@/src/reports/infrastructure/ClsReportController";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import * as XLSX from "xlsx";

export function useExportReports() {
  const { setAnnouncement } = useAnnouncement();
  const { download, setDownload } = useDownload();

  const [type, setType] = useState<"monthly" | "annual">("monthly");
  const [date, setDate] = useState<Date | null>(new Date());

  const transformReports = (
    reports: IReportPrimitive[],
  ): Omit<IReportPrimitive, "id">[] => {
    const newReports: Omit<IReportPrimitive, "id">[] = [];
    reports.forEach((r) =>
      newReports.push({
        date: r.date,
        breakfastStatus: r.breakfastStatus,
        lunchStatus: r.lunchStatus,
        dinnerStatus: r.dinnerStatus,
      }),
    );

    return newReports;
  };

  const generateExcel = async (reports: IReportPrimitive[]) => {
    try {
      const newReports = transformReports(reports);

      const worksheet = XLSX.utils.json_to_sheet(newReports);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Comiditas");

      const base64 = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });

      const file = new File(Paths.cache, `reporte_${Date.now()}.xlsx`);
      file.write(base64, { encoding: "base64" });

      const disponible = await Sharing.isAvailableAsync();
      if (disponible) {
        await Sharing.shareAsync(file.uri, {
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          dialogTitle: "Guardar o compartir Excel",
          UTI: "com.microsoft.excel.xlsx",
        });
      } else {
        setAnnouncement({
          isActivated: true,
          announceType: "info",
          message: `Excel generado en: ${file.uri}`,
        });
      }
    } catch (error) {
      console.error(error);
      setAnnouncement({
        isActivated: true,
        announceType: "error",
        message: "Ocurrió un error al generar el Excel",
      });
    }
  };

  const downloadAction = async () => {
    if (download.downloading) {
      setAnnouncement({
        isActivated: true,
        announceType: "info",
        message: "Ya hay otra descarga en proceso",
      });
      return;
    }

    setDownload({
      downloading: true,
      answerType: "info",
      message: "Descargando",
    });
    setAnnouncement({
      isActivated: true,
      announceType: "info",
      message: "Generando Excel...",
    });

    const response = await ClsReportController.selectReports({
      date: date ?? new Date(),
      type,
    });

    if (response.ok) {
      await generateExcel(response.reports);
    } else {
      setAnnouncement({
        isActivated: true,
        announceType: "error",
        message: response.message,
      });
    }

    setDownload({
      downloading: false,
      answerType: "ok",
      message: "Descarga completa",
    });
  };

  return { date, setDate, type, setType, downloadAction };
}
