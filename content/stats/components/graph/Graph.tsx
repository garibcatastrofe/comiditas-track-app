/* API */
import { IReportStats } from "@/src/reports/domain/interfaces/IReportStats";

/* COMPONENTS */
import { TextApp } from "@/content/shared/ui/text/TextApp";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

/* HOOKS */
import { useState } from "react";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function Graph({
  objExcelentReport,
  objRegularReport,
  objTerribleReport,
  objEmptyReport,
  month,
  year,
}: Omit<IReportStats, "reports" | "recordedDays" | "notRecordedDays">) {
  const { theme } = useTheme();

  const [width, setWidth] = useState(0);

  const data: { value: number; color: string; focused: boolean }[] = [
    {
      value: objExcelentReport.count,
      color: theme.success,
      focused: objExcelentReport.focused,
    },
    {
      value: objRegularReport.count,
      color: theme.warn,
      focused: objRegularReport.focused,
    },
    {
      value: objTerribleReport.count,
      color: theme.danger,
      focused: objTerribleReport.focused,
    },
    {
      value: objEmptyReport.count,
      color: theme.info,
      focused: objEmptyReport.focused,
    },
  ];

  return (
    <View
      className="w-[calc(100%-1.5rem)] p-6 mx-6 mt-2 rounded-xl"
      style={{ backgroundColor: theme.card }}
      onLayout={(event) => {
        setWidth(event.nativeEvent.layout.width);
      }}
    >
      <TextApp className="mb-6 text-xl" style={{ color: theme.ink }}>
        Reportes del mes
      </TextApp>

      {width > 0 && (
        <PieChart
          data={data}
          radius={(width - 48) / 2}
          donut
          innerRadius={(width - 48) / 3}
          innerCircleColor={theme.card}
          centerLabelComponent={() => {
            return (
              <View className="items-center justify-center">
                <TextApp
                  style={{ fontFamily: "DMSans_700Bold", color: theme.ink }}
                  className="text-2xl"
                >
                  {month}
                </TextApp>
                <TextApp>{year}</TextApp>
              </View>
            );
          }}
        />
      )}

      <View className="gap-4 mt-6">
        <View className="flex-row">
          <View className="flex-row items-center flex-1 gap-4">
            <Dot color={theme.success} />
            <TextApp>Excelente: {objExcelentReport.count}</TextApp>
          </View>
          <View className="flex-row items-center flex-1 gap-4">
            <Dot color={theme.warn} />
            <TextApp>Regular: {objRegularReport.count}</TextApp>
          </View>
        </View>

        <View className="flex-row">
          <View className="flex-row items-center flex-1 gap-4">
            <Dot color={theme.danger} />
            <TextApp>Terrible: {objTerribleReport.count}</TextApp>
          </View>
          <View className="flex-row items-center flex-1 gap-4">
            <Dot color={theme.info} />
            <TextApp>Vacío: {objEmptyReport.count}</TextApp>
          </View>
        </View>
      </View>
    </View>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
      }}
    />
  );
}
