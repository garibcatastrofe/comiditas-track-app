import { useAnnouncement } from "@/content/shared/components/announcement/stores/announcementStore";
import { useModal } from "@/content/shared/components/modal/stores/modalStore";
import { TextApp } from "@/content/shared/components/textApp/TextApp";
import { DinamicInputDate } from "@/content/shared/form/dinamicInputDate/DinamicInputDate";
import { useTheme } from "@/theme/ThemeContext";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { useDownload } from "./stores/downloadStore";

export function ModalBodyDownloadStats() {
  const { theme } = useTheme();
  const { setModal, modal } = useModal();
  const { setAnnouncement } = useAnnouncement();
  const { download, setDownload } = useDownload();

  const [type, setType] = useState<"monthly" | "annual">("monthly");
  const [date, setDate] = useState<Date | null>(new Date());

  const generarYDescargarPDF = async () => {
    const html = `
        <html>
          <body style="font-family: -apple-system, sans-serif; padding: 30px;">
            <h1>Reporte Personalizado</h1>
            <p><strong>Nombre:</strong>Garib</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
            <p>Este es un pequeño usuario</p>
          </body>
        </html>
      `;

    try {
      const { uri } = await Print.printToFileAsync({ html });

      const disponible = await Sharing.isAvailableAsync();
      if (disponible) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Guardar o compartir PDF",
          UTI: "com.adobe.pdf",
        });
      } else {
        Alert.alert("PDF generado", `Guardado en: ${uri}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo generar el PDF");
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

    await generarYDescargarPDF();

    setAnnouncement({
      isActivated: true,
      announceType: "ok",
      message: "Estadísticas descargadas correctamente",
    });
    setModal({ isActivated: false, title: "Descargar", body: modal.body });
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
          onPress={() =>
            setModal({
              isActivated: false,
              title: "Filtrar",
              body: modal.body,
            })
          }
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
