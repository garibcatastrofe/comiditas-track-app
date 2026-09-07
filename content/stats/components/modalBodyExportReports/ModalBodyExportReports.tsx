import { useModal } from "@/content/shared/components/modal/stores/modalStore";
import { TextApp } from "@/content/shared/components/textApp/TextApp";
import { DinamicInputDate } from "@/content/shared/form/dinamicInputDate/DinamicInputDate";
import { useTheme } from "@/theme/ThemeContext";
import { Pressable, View } from "react-native";
import { useDownload } from "../../stores/downloadStore";
import { useExportReports } from "./hooks/useExportReports";

export function ModalBodyExportReports() {
  const { theme } = useTheme();
  const { setModal, modal } = useModal();
  const { download } = useDownload();
  const { date, setDate, type, setType, downloadAction } = useExportReports();

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

      {/* BOTONES CANCELAR Y EXPORTAR */}
      <View className="flex-row gap-4">
        <Pressable
          className="items-center justify-center flex-1 p-4 rounded-full"
          style={{
            backgroundColor: theme.card,
          }}
          onPress={() => {
            setModal({
              isActivated: false,
              title: "Exportar",
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
            Exportar
          </TextApp>
        </Pressable>
      </View>
    </View>
  );
}
