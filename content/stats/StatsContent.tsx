/* COMPONENTS */
import { Report } from "@/content/shared/components/report/Report";
import { Title } from "@/content/shared/components/title/Title";
import { TextApp } from "@/content/shared/ui/text/TextApp";
import { FlatList, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Graph } from "./components/graph/Graph";

/* HOOKS */
import { useStats } from "./hooks/useStats";

/* ICONS */
import { Download, SlidersHorizontal } from "lucide-react-native";

/* NAVIGATION */
import { useRouter } from "expo-router";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function StatsContent() {
  const router = useRouter();
  const { theme } = useTheme();
  const { stats } = useStats();

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <ScrollView className="py-6" contentContainerClassName="gap-4">
        <Title text1="Mis" text2="estadísticas" />

        <View>
          <View className="flex-row gap-4 px-6">
            <Pressable
              className="items-center justify-center flex-1 p-4 rounded-full"
              style={{
                backgroundColor: stats ? theme.primary : theme.disabled_bg,
              }}
              onPress={stats ? () => {} : undefined}
            >
              <SlidersHorizontal
                size={20}
                color={stats ? theme.primary_txt : theme.disabled}
              />
            </Pressable>
            <Pressable
              className="items-center justify-center flex-1 p-4 rounded-full"
              style={{
                backgroundColor: stats ? theme.primary : theme.disabled_bg,
              }}
              onPress={stats ? () => {} : undefined}
            >
              <Download
                size={20}
                color={stats ? theme.primary_txt : theme.disabled}
              />
            </Pressable>
          </View>
        </View>

        {!stats ? (
          <View className="px-6">
            <TextApp>Cargando...</TextApp>
          </View>
        ) : (
          <>
            <Graph
              objExcelentReport={stats.objExcelentReport}
              objRegularReport={stats.objRegularReport}
              objTerribleReport={stats.objTerribleReport}
              objEmptyReport={stats.objEmptyReport}
              month={stats.month}
              year={stats.year}
            />

            <View className="flex-row gap-4 px-6">
              <View
                className="flex-1 p-6 rounded-xl"
                style={{ backgroundColor: theme.card }}
              >
                <TextApp className="mb-2 text-xl" style={{ color: theme.ink }}>
                  Registrados
                </TextApp>
                <TextApp>{stats.recordedDays}</TextApp>
              </View>

              <View
                className="flex-1 p-6 rounded-xl"
                style={{ backgroundColor: theme.card }}
              >
                <TextApp className="mb-2 text-xl" style={{ color: theme.ink }}>
                  Sin registros
                </TextApp>
                <TextApp>{stats.notRecordedDays}</TextApp>
              </View>
            </View>

            <FlatList
              horizontal
              data={stats.reports}
              keyExtractor={(report) => report.id?.toString() ?? ""}
              contentContainerClassName="gap-4 px-6 mb-12"
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Report
                  id={item.id}
                  date={item.date}
                  breakfastStatus={item.breakfastStatus}
                  lunchStatus={item.lunchStatus}
                  dinnerStatus={item.dinnerStatus}
                  twClassName="w-80"
                  goAction={() =>
                    router.push({
                      pathname: "/reports/[date]/report",
                      params: { date: item.date },
                    })
                  }
                />
              )}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
