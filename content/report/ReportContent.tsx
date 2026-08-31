/* COMPONENTS */
import { Title } from "@/content/shared/components/title/Title";
import { TextApp } from "@/content/shared/ui/text/TextApp";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* HOOKS */
import { useReport } from "./hooks/useReport";

/* ICONS */
import {
  Check,
  CircleQuestionMark,
  Minus,
  SquarePen,
  X,
} from "lucide-react-native";

/* NAVIGATION */
import { useLocalSearchParams, useRouter } from "expo-router";

/* ICONS */
import { ArrowLeft, Calendar } from "lucide-react-native";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

/* UTILS */
import { formatDate } from "@/content/shared/utils/formatDate";
import { useEffect } from "react";

export function ReportContent() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { theme } = useTheme();
  const { report, changeMealStatus, updateReport, updating } = useReport(id);

  useEffect(() => {
    console.log(report);
  }, [report]);

  return (
    <SafeAreaView
      className="flex-col justify-center flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <ScrollView className="flex-1 py-6" contentContainerClassName="gap-4">
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

        {!report ? (
          <View className="gap-4 mx-6">
            <TextApp>Cargando...</TextApp>
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
              meal="desayuno"
              status={report.breakfast_status}
              changeMealStatus={changeMealStatus}
            />
            <MealStatusSelector
              label="Comida"
              meal="comida"
              status={report.lunch_status}
              changeMealStatus={changeMealStatus}
            />
            <MealStatusSelector
              label="Cena"
              meal="cena"
              status={report.dinner_status}
              changeMealStatus={changeMealStatus}
            />
          </View>
        )}
      </ScrollView>

      {report && (
        <Pressable
          className="flex-row items-center justify-center gap-4 px-4 py-4 mx-6 mb-6 rounded-full"
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
    </SafeAreaView>
  );
}

function MealStatusSelector({
  label,
  meal,
  status,
  changeMealStatus,
}: {
  label: string;
  meal: string;
  status: string;
  changeMealStatus: (status: string, meal: string) => void;
}) {
  const { theme } = useTheme();

  return (
    <View className="gap-4">
      <TextApp className="text-lg">{label}</TextApp>

      <View className="flex-row gap-4">
        <Pressable
          className="items-center justify-center flex-1 p-4 rounded-full"
          style={{
            backgroundColor:
              status === "excelente" ? theme.success_bg : theme.surface,
          }}
          onPress={() => changeMealStatus("excelente", meal)}
        >
          <Check
            size={20}
            color={status === "excelente" ? theme.success : theme.muted}
          />
        </Pressable>

        <Pressable
          className="items-center justify-center flex-1 p-4 rounded-full"
          style={{
            backgroundColor:
              status === "regular" ? theme.warn_bg : theme.surface,
          }}
          onPress={() => changeMealStatus("regular", meal)}
        >
          <Minus
            size={20}
            color={status === "regular" ? theme.warn : theme.muted}
          />
        </Pressable>

        <Pressable
          className="items-center justify-center flex-1 p-4 rounded-full"
          style={{
            backgroundColor:
              status === "terrible" ? theme.danger_bg : theme.surface,
          }}
          onPress={() => changeMealStatus("terrible", meal)}
        >
          <X
            size={20}
            color={status === "terrible" ? theme.danger : theme.muted}
          />
        </Pressable>

        <Pressable
          className="items-center justify-center flex-1 p-4 rounded-full"
          style={{
            backgroundColor: status === "vacio" ? theme.info_bg : theme.surface,
          }}
          onPress={() => changeMealStatus("vacio", meal)}
        >
          <CircleQuestionMark
            size={20}
            color={status === "vacio" ? theme.info : theme.muted}
          />
        </Pressable>
      </View>
    </View>
  );
}
