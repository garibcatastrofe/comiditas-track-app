/* API */
import { IReportPrimitive } from "@/src/reports/domain/interfaces/IReportPrimitive";

/* COMPONENTS */
import { Report } from "@/content/shared/components/report/Report";
import { Title } from "@/content/shared/components/title/Title";
import { TextApp } from "@/content/shared/ui/text/TextApp";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* NAVIGATION */
import { useRouter } from "expo-router";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function HomeContent() {
  const router = useRouter();

  const { theme } = useTheme();

  const report: IReportPrimitive = {
    id: 1,
    date: "2026-08-27",
    breakfastStatus: "excelent",
    lunchStatus: "regular",
    dinnerStatus: "terrible",
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
        <TextApp
          className="mx-6 mb-4 text-xl"
          style={{ fontFamily: "DMSans_500Medium" }}
        >
          ¿Cómo van tus comidas hoy?
        </TextApp>
        <View className="mx-6">
          <Report
            id={report.id}
            date={report.date}
            breakfastStatus={report.breakfastStatus}
            lunchStatus={report.lunchStatus}
            dinnerStatus={report.dinnerStatus}
            goAction={() =>
              router.push({
                pathname: "/reports/[id]/report",
                params: { id: report.id ?? 0 },
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
