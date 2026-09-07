import { ScrollViewContainer } from "@/content/shared/components/scrollViewContainer/ScrollViewContainer";
import { TextApp } from "@/content/shared/components/textApp/TextApp";
import { Title } from "@/content/shared/components/title/Title";
import { TryAgainContent } from "@/content/shared/components/tryAgainContent/TryAgainContent";
import { formatDate } from "@/content/shared/utils/formatDate";
import { useTheme } from "@/theme/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  SquarePen
} from "lucide-react-native";
import { Pressable, View } from "react-native";
import { MealStatusSelector } from "./components/mealStatusSelector/MealStatusSelector";
import { useReport } from "./hooks/useReport";

export function ReportContent() {
  const router = useRouter();
  const { date } = useLocalSearchParams<{ date: string }>();

  const { theme } = useTheme();
  const {
    report,
    changeMealStatus,
    updateReport,
    updating,
    retry,
    loading,
    error,
  } = useReport(date);

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <ScrollViewContainer>
        <View className="flex-row items-center mx-6">
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.body} />
          </Pressable>
          <Title text1="Reporte" text2="" />
        </View>

        <TextApp
          className="mx-6 mb-2 text-xl"
          style={{ fontFamily: "DMSans_500Medium" }}
        >
          ¿Cómo fueron tus comidas este día?
        </TextApp>

        {loading ? (
          <View className="mx-6">
            <TextApp>Cargando...</TextApp>
          </View>
        ) : error ? (
          <TryAgainContent
            action={retry}
            label="Ocurrió un error al obtener el reporte"
          />
        ) : !report ? (
          <View className="mx-6">
            <TextApp className="text-lg">El reporte llegó nulo</TextApp>
          </View>
        ) : (
          <View className="gap-4 mx-6">
            <TextApp className="text-lg">Fecha</TextApp>
            <View className="flex-row items-center gap-4">
              <Calendar size={20} color={theme.ink} />
              <TextApp>{formatDate(report.date)}</TextApp>
            </View>

            <MealStatusSelector
              label="Desayuno"
              meal="breakfast"
              status={report.breakfastStatus}
              changeMealStatus={changeMealStatus}
            />
            <MealStatusSelector
              label="Comida"
              meal="lunch"
              status={report.lunchStatus}
              changeMealStatus={changeMealStatus}
            />
            <MealStatusSelector
              label="Cena"
              meal="dinner"
              status={report.dinnerStatus}
              changeMealStatus={changeMealStatus}
            />
          </View>
        )}
      </ScrollViewContainer>

      {!loading && !error && (
        <Pressable
          className="flex-row items-center justify-center gap-4 p-4 mx-6 mb-6 rounded-full"
          style={{
            backgroundColor: updating ? theme.disabled_bg : theme.primary,
          }}
          onPress={!updating ? updateReport : undefined}
        >
          <SquarePen
            size={20}
            color={updating ? theme.disabled : theme.primary_txt}
          />
          <TextApp
            className="text-lg"
            style={{
              fontFamily: "DMSans_700Bold",
              color: updating ? theme.disabled : theme.primary_txt,
            }}
          >
            Actualizar
          </TextApp>
        </Pressable>
      )}
    </View>
  );
}
