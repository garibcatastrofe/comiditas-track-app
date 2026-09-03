/* COMPONENTS */
import { TextApp } from "@/content/shared/components/textApp/TextApp";
import { DinamicInputDate } from "@/content/shared/form/dinamicInputDate/DinamicInputDate";
import { Pressable, View } from "react-native";

/* HOOKS */
import { useState } from "react";

/* STORES */
import { useAnnouncement } from "@/content/shared/components/announcement/stores/announcementStore";
import { useModal } from "@/content/shared/components/modal/stores/modalStore";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function ModalBodyFilterStats({
  value,
  onChange,
}: {
  value: Date | null;
  onChange: (date: Date) => void;
}) {
  const { theme } = useTheme();
  const { setModal, modal } = useModal();
  const { setAnnouncement } = useAnnouncement();

  const [date, setDate] = useState<Date | null>(value);

  const filterAction = () => {
    onChange(date ?? new Date());
    setAnnouncement({
      isActivated: true,
      announceType: "ok",
      message: "Filtro aplicado",
    });
    setModal({ isActivated: false, title: "Filtrar", body: modal.body });
  };

  return (
    <View className="gap-4">
      <DinamicInputDate value={date} onChange={setDate} />

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
            backgroundColor: theme.primary,
          }}
          onPress={filterAction}
        >
          <TextApp
            className="text-lg"
            style={{
              fontFamily: "DMSans_700Bold",
              color: theme.primary_txt,
            }}
          >
            Filtrar
          </TextApp>
        </Pressable>
      </View>
    </View>
  );
}
