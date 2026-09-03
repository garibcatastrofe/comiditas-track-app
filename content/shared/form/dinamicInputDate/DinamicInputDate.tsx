import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type PickerMode = "date" | "time" | "datetime";

interface DateInputProps {
  value: Date | null;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  mode?: PickerMode;
  minimumDate?: Date;
  maximumDate?: Date;
}

export function DinamicInputDate({
  value,
  onChange,
  label = "Fecha",
  placeholder = "Selecciona una fecha",
  mode = "date",
  minimumDate,
  maximumDate,
}: DateInputProps) {
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ): void => {
    // En Android el picker se cierra solo al elegir o cancelar
    setShowPicker(Platform.OS === "ios");

    if (event.type === "dismissed") {
      setShowPicker(false);
      return;
    }

    if (selectedDate) {
      onChange(selectedDate);
    }

    if (Platform.OS === "android") {
      setShowPicker(false);
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return placeholder;
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}
      >
        <Text style={value ? styles.valueText : styles.placeholderText}>
          {formatDate(value)}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}

      {Platform.OS === "ios" && showPicker && (
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => setShowPicker(false)}
        >
          <Text style={styles.doneButtonText}>Listo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  valueText: {
    fontSize: 16,
    color: "#000",
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
  doneButton: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  doneButtonText: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
