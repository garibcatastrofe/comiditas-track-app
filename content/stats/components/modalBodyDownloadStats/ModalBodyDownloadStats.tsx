import { useAnnouncement } from "@/content/shared/components/announcement/stores/announcementStore";
import { useModal } from "@/content/shared/components/modal/stores/modalStore";
import { TextApp } from "@/content/shared/components/textApp/TextApp";
import { DinamicInputDate } from "@/content/shared/form/dinamicInputDate/DinamicInputDate";
import { IReportPrimitive } from "@/src/reports/domain/interfaces/IReportPrimitive";
import { ClsReportController } from "@/src/reports/infrastructure/ClsReportController";
import { useTheme } from "@/theme/ThemeContext";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import { Pressable, View } from "react-native";
import * as XLSX from "xlsx";
import { useDownload } from "./stores/downloadStore";

export function ModalBodyDownloadStats() {
  const { theme } = useTheme();
  const { setModal, modal } = useModal();
  const { setAnnouncement } = useAnnouncement();
  const { download, setDownload } = useDownload();

  const [type, setType] = useState<"monthly" | "annual">("monthly");
  const [date, setDate] = useState<Date | null>(new Date());

  const generarYDescargarExcel = async (reports: IReportPrimitive[]) => {
    try {
      const newReports: Omit<IReportPrimitive, "id">[] = [];
      reports.forEach((r) =>
        newReports.push({
          date: r.date,
          breakfastStatus: r.breakfastStatus,
          lunchStatus: r.lunchStatus,
          dinnerStatus: r.dinnerStatus,
        }),
      );

      const worksheet = XLSX.utils.json_to_sheet(newReports);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Comiditas");

      const base64 = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });

      // Nueva API: crear un File dentro del directorio cache
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
      await generarYDescargarExcel(response.reports);
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

  return (
    <View className="gap-4">
      {/* TYPE */}
      <View className="gap-4">
        <TextApp className="text-lg">Tipo</TextApp>

        <View className="flex-row gap-4">
          <Pressable
            className="items-center justify-center flex-1 p-4 border-2 rounded-full"
            style={{
              backgroundColor:
                type === "monthly" ? theme.primary_bg : theme.surface,
              borderColor: type === "monthly" ? theme.primary : theme.surface,
            }}
            onPress={() => setType("monthly")}
          >
            <TextApp
              style={{ color: type === "monthly" ? theme.primary : theme.body }}
            >
              Mensual
            </TextApp>
          </Pressable>

          <Pressable
            className="items-center justify-center flex-1 p-4 border-2 rounded-full"
            style={{
              backgroundColor:
                type === "annual" ? theme.primary_bg : theme.surface,
              borderColor: type === "annual" ? theme.primary : theme.surface,
            }}
            onPress={() => setType("annual")}
          >
            <TextApp
              style={{ color: type === "annual" ? theme.primary : theme.body }}
            >
              Anual
            </TextApp>
          </Pressable>
        </View>
      </View>

      {/* DATE */}
      <DinamicInputDate value={date} onChange={setDate} />

      {/* BOTONES CANCELAR Y DESCARGAR */}
      <View className="flex-row gap-4">
        <Pressable
          className="items-center justify-center flex-1 p-4 rounded-full"
          style={{
            backgroundColor: theme.card,
          }}
          onPress={() => {
            setModal({
              isActivated: false,
              title: "Descargar",
              body: modal.body,
            });
          }}
        >
          <TextApp
            className="text-lg"
            style={{
              fontFamily: "DMSans_700Bold",
              color: theme.ink,
            }}
          >
            Cancelar
          </TextApp>
        </Pressable>
        <Pressable
          className="items-center justify-center flex-1 p-4 rounded-full"
          style={{
            backgroundColor: download.downloading
              ? theme.disabled_bg
              : theme.primary,
          }}
          onPress={download.downloading ? () => {} : downloadAction}
        >
          <TextApp
            className="text-lg"
            style={{
              fontFamily: "DMSans_700Bold",
              color: download.downloading ? theme.disabled : theme.primary_txt,
            }}
          >
            Descargar
          </TextApp>
        </Pressable>
      </View>
    </View>
  );
}
