import { TextApp } from "@/content/shared/components/textApp/TextApp";
import { useTheme } from "@/theme/ThemeContext";
import { Portal } from "@gorhom/portal";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { Calendar } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

interface DateInputProps {
  value: Date | null;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export function DinamicInputDate({
  value,
  onChange,
  label = "Fecha",
  placeholder = "Selecciona una fecha",
  minimumDate,
  maximumDate,
}: DateInputProps) {
  const { theme } = useTheme();

  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [tempDate, setTempDate] = useState<DateType>(
    value ? dayjs(value) : dayjs(),
  );

  const formatDate = (date: Date | null): string => {
    if (!date) return placeholder;
    return dayjs(date).format("DD/MM/YYYY");
  };

  const handleConfirm = (): void => {
    if (tempDate) {
      onChange(dayjs(tempDate).toDate());
    }
    setShowPicker(false);
  };

  return (
    <View className="mb-4">
      {label && <TextApp className="mb-4 text-lg">{label}</TextApp>}

      <Pressable
        onPress={() => setShowPicker(true)}
        className="flex-row items-center justify-between p-4 border rounded-xl"
        style={{ borderColor: theme.line_2 }}
      >
        <TextApp style={{ color: value ? theme.body : theme.muted }}>
          {formatDate(value)}
        </TextApp>
        <Calendar size={20} color={theme.muted} />
      </Pressable>

      {showPicker && (
        <Portal>
          <Pressable
            style={{
              ...StyleSheet.absoluteFill,
            }}
            className="bg-black/50 justify-center items-center z-[999]"
            onPress={() => setShowPicker(false)} // 👈 cierra al tocar el overlay
          >
            <Pressable
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.line,
              }}
              className="rounded-xl p-6 w-[90%] border"
              onPress={() => {}} // 👈 "absorbe" el toque, no cierra
            >
              <DateTimePicker
                mode="single"
                date={tempDate}
                onChange={(params) => setTempDate(params.date)}
                minDate={minimumDate}
                maxDate={maximumDate}
                styles={{
                  today: {
                    borderColor: theme.primary,
                    borderWidth: 1,
                  },
                  selected: {
                    backgroundColor: theme.primary,
                  },
                  selected_label: { color: theme.primary_txt },
                  day_label: {
                    color: theme.body,
                    fontFamily: "DMSans_700Bold",
                  },
                  disabled_label: { color: theme.muted },
                  outside_label: { color: theme.muted },
                  month_selector_label: {
                    color: theme.ink,
                    fontWeight: "600" as const,
                    textTransform: "capitalize" as const, // 👈 "septiembre" → "Septiembre"
                    fontFamily: "DMSans_700Bold",
                    fontSize: 13,
                  },
                  year_selector_label: {
                    color: theme.ink,
                    fontWeight: "600" as const,
                    fontFamily: "DMSans_700Bold",
                  },
                  weekday_label: {
                    color: theme.muted,
                    textTransform: "capitalize" as const, // 👈 "lun" → "Lun"
                    fontFamily: "DMSans_700Bold",
                    fontSize: 13,
                  },
                  // Estilos para la vista de selección de mes (cuando tocas el header)
                  month_label: {
                    color: theme.ink,
                    textTransform: "capitalize" as const, // 👈 lista de meses en el selector
                    fontSize: 13,
                    fontFamily: "DMSans_700Bold",
                  },
                  year_label: {
                    color: theme.ink,
                    textTransform: "capitalize" as const, // 👈 lista de meses en el selector
                    fontSize: 13,
                    fontFamily: "DMSans_700Bold",
                  },
                  selected_month_label: {
                    color: theme.ink,
                    textTransform: "capitalize" as const,
                  },
                  /* header: { backgroundColor: colors.surface }, */
                  button_prev: { tintColor: theme.body },
                  button_next: { tintColor: theme.body },
                }}
                locale="es"
              />

              <View className="flex-row justify-end gap-6 mt-4">
                <Pressable onPress={() => setShowPicker(false)}>
                  <TextApp style={{ fontFamily: "DMSans_700Bold" }}>
                    Cancelar
                  </TextApp>
                </Pressable>
                <Pressable onPress={handleConfirm}>
                  <TextApp
                    style={{
                      fontFamily: "DMSans_700Bold",
                      color: theme.primary,
                    }}
                  >
                    Aceptar
                  </TextApp>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Portal>
      )}
    </View>
  );
}
