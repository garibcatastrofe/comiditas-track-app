import { useModal } from "@/content/shared/components/modal/stores/modalStore";
import { Report } from "@/content/shared/components/report/Report";
import { ScrollViewContainer } from "@/content/shared/components/scrollViewContainer/ScrollViewContainer";
import { TextApp } from "@/content/shared/components/textApp/TextApp";
import { Title } from "@/content/shared/components/title/Title";
import { TryAgainContent } from "@/content/shared/components/tryAgainContent/TryAgainContent";
import { useTheme } from "@/theme/ThemeContext";
import { useRouter } from "expo-router";
import { Download, SlidersHorizontal } from "lucide-react-native";
import { FlatList, Pressable, View } from "react-native";
import { Graph } from "./components/graph/Graph";
import { ModalBodyDownloadStats } from "./components/modalBodyDownloadStats/ModalBodyDownloadStats";
import { ModalBodyFilterStats } from "./components/modalBodyFilterStats/ModalBodyFilterStats";
import { useStats } from "./hooks/useStats";

export function StatsContent() {
  const router = useRouter();
  const { theme } = useTheme();
  const { stats, error, loading, setDate, retry, date } = useStats();
  const { setModal } = useModal();

  return (
    <ScrollViewContainer>
      <Title text1="Mis" text2="estadísticas" />

      {loading ? (
        <View className="mx-6">
          <TextApp>Cargando...</TextApp>
        </View>
      ) : error ? (
        <TryAgainContent
          action={retry}
          label="Ocurrió un error al obtener las estadísticas"
        />
      ) : !stats ? (
        <TryAgainContent
          action={retry}
          label="Las estadísticas llegarón vacías"
        />
      ) : (
        <View className="gap-4">
          <View className="flex-row gap-4 px-6">
            <Pressable
              className="items-center justify-center flex-1 p-4 rounded-full"
              style={{
                backgroundColor: theme.primary,
              }}
              onPress={() =>
                setModal({
                  isActivated: true,
                  title: "Filtrar",
                  body: (
                    <ModalBodyFilterStats value={date} onChange={setDate} />
                  ),
                })
              }
            >
              <SlidersHorizontal size={20} color={theme.primary_txt} />
            </Pressable>
            <Pressable
              className="items-center justify-center flex-1 p-4 rounded-full"
              style={{
                backgroundColor: theme.primary,
              }}
              onPress={() =>
                setModal({
                  isActivated: true,
                  title: "Descargar",
                  body: <ModalBodyDownloadStats />,
                })
              }
            >
              <Download size={20} color={theme.primary_txt} />
            </Pressable>
          </View>

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
            keyExtractor={(report) => report.date}
            contentContainerClassName="gap-4 px-6 mb-12"
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Report
                id={item.id}
                date={item.date}
                breakfastStatus={item.breakfastStatus}
                lunchStatus={item.lunchStatus}
                dinnerStatus={item.dinnerStatus}
                exist={item.exist}
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
        </View>
      )}
    </ScrollViewContainer>
  );
}
