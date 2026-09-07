import { TextApp } from "@/content/shared/components/textApp/TextApp";
import { formatDate } from "@/content/shared/utils/formatDate";
import { useTheme } from "@/theme/ThemeContext";
import {
  Check,
  CircleAlert,
  CircleQuestionMark,
  Minus,
  X,
} from "lucide-react-native";
import { Pressable, View } from "react-native";
import { IReportProps } from "./types/IReportProps";

export function Report({
  id,
  date,
  breakfastStatus,
  lunchStatus,
  dinnerStatus,
  goAction,
  twClassName,
  exist = true,
}: IReportProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      className={`p-6 rounded-xl gap-4 ${twClassName && twClassName}`}
      style={{ backgroundColor: theme.card }}
      onPress={goAction}
    >
      <TextApp className="text-xl" style={{ color: theme.ink }}>
        {formatDate(date)}
      </TextApp>
      <View className="gap-4">
        {exist ? (
          <>
            <View className="flex-row items-center justify-between gap-4">
              <TextApp className="text-lg">Desayuno</TextApp>
              <ReportStatusTag status={breakfastStatus} />
            </View>

            <View className="flex-row items-center justify-between gap-4">
              <TextApp className="text-lg">Comida</TextApp>
              <ReportStatusTag status={lunchStatus} />
            </View>

            <View className="flex-row items-center justify-between gap-4">
              <TextApp className="text-lg">Cena</TextApp>
              <ReportStatusTag status={dinnerStatus} />
            </View>
          </>
        ) : (
          <View className="flex-row items-center justify-center gap-4">
            <CircleAlert size={20} color={theme.danger} />
            <TextApp>Sin registros</TextApp>
          </View>
        )}
      </View>
    </Pressable>
  );
}

function ReportStatusTag({ status }: { status: string }) {
  const { theme } = useTheme();

  const getBackgroundColor = (status: string) => {
    if (status === "excelent") return theme.success_bg;
    if (status === "regular") return theme.warn_bg;
    if (status === "terrible") return theme.danger_bg;
    return theme.info_bg;
  };

  const getTintColor = (status: string) => {
    if (status === "excelent") return theme.success;
    if (status === "regular") return theme.warn;
    if (status === "terrible") return theme.danger;
    return theme.info;
  };

  const getLabel = (status: string) => {
    if (status === "excelent") return "Excelente";
    if (status === "regular") return "Regular";
    if (status === "terrible") return "Terrible";
    return "Vacío";
  };

  return (
    <View
      className="flex-row items-center gap-4 px-4 py-2 rounded-full"
      style={{ backgroundColor: getBackgroundColor(status) }}
    >
      <Icon status={status} />
      <TextApp style={{ color: getTintColor(status) }}>
        {getLabel(status)}
      </TextApp>
    </View>
  );
}

function Icon({ status }: { status: string }) {
  const { theme } = useTheme();

  if (status === "excelent") return <Check size={20} color={theme.success} />;
  if (status === "regular") return <Minus size={20} color={theme.warn} />;
  if (status === "terrible") return <X size={20} color={theme.danger} />;
  return <CircleQuestionMark size={20} color={theme.info} />;
}
