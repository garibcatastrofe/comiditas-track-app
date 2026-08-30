/* API */
import { IReportPrimitive } from "@/api/reports/domain/interfaces/IReportPrimitive";

/* COMPONENTS */
import { Report } from "@/content/shared/components/report/Report";
import { Title } from "@/content/shared/components/title/Title";
import { TextApp } from "@/content/shared/ui/text/TextApp";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function Home() {
  const { theme } = useTheme();

  const report: IReportPrimitive = {
    id: 1,
    date: "2026-08-27",
    breakfast_status: "excelente",
    lunch_status: "regular",
    dinner_status: "terrible",
  };

  return (
    <SafeAreaView
      className="flex-col justify-center flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <ScrollView
        className="flex-1 py-6"
        contentContainerClassName="flex-col gap-4"
      >
        <Title text1="Hola" text2="Garib" />
        <TextApp className="mx-6 mb-4 text-xl">
          ¿Cómo van tus comidas hoy?
        </TextApp>
        <Report
          id={report.id}
          date={report.date}
          breakfast_status={report.breakfast_status}
          lunch_status={report.lunch_status}
          dinner_status={report.dinner_status}
          twClassName=""
        />
      </ScrollView>
    </SafeAreaView>
  );
}
