/* COMPONENTS */
import { TextApp } from "@/content/shared/ui/text/TextApp";
import { Pressable, View } from "react-native";

/* ICONS */
import { Check, CircleQuestionMark, Minus, X } from "lucide-react-native";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

/* TYPES */
import { IReportProps } from "./types/IReportProps";

/* UTILS */
import { formatDate } from "@/content/shared/utils/formatDate";

export function Report({
  id,
  date,
  breakfast_status,
  lunch_status,
  dinner_status,
  goAction,
  twClassName,
}: IReportProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      className={`p-6 rounded-xl mx-6 gap-4 ${twClassName && twClassName}`}
      style={{ backgroundColor: theme.surface }}
      onPress={goAction}
    >
      <TextApp className="text-xl" style={{ fontFamily: "DMSans_500Medium" }}>
        {formatDate(date)}
      </TextApp>
      <View className="gap-4">
        <View className="flex-row items-center justify-between gap-4">
          <TextApp className="text-lg">Desayuno</TextApp>
          <ReportStatusTag status={breakfast_status} />
        </View>

        <View className="flex-row items-center justify-between gap-4">
          <TextApp className="text-lg">Comida</TextApp>
          <ReportStatusTag status={lunch_status} />
        </View>

        <View className="flex-row items-center justify-between gap-4">
          <TextApp className="text-lg">Cena</TextApp>
          <ReportStatusTag status={dinner_status} />
        </View>
      </View>
    </Pressable>
  );
}

function ReportStatusTag({ status }: { status: string }) {
  const { theme } = useTheme();

  const getBackgroundColor = (status: string) => {
    if (status === "excelente") return theme.success_bg;
    if (status === "regular") return theme.warn_bg;
    if (status === "terrible") return theme.danger_bg;
    return theme.info_bg;
  };

  const getTintColor = (status: string) => {
    if (status === "excelente") return theme.success;
    if (status === "regular") return theme.warn;
    if (status === "terrible") return theme.danger;
    return theme.info;
  };

  const getLabel = (status: string) => {
    if (status === "excelente") return "Excelente";
    if (status === "regular") return "Regular";
    if (status === "terrible") return "Terrible";
    return "Vacío";
  };

  const Icon = () => {
    if (status === "excelente")
      return <Check size={20} color={theme.success} />;
    if (status === "regular") return <Minus size={20} color={theme.warn} />;
    if (status === "terrible") return <X size={20} color={theme.danger} />;
    return <CircleQuestionMark size={20} color={theme.info} />;
  };

  return (
    <View
      className="flex-row items-center gap-4 px-4 py-2 rounded-full"
      style={{ backgroundColor: getBackgroundColor(status) }}
    >
      <Icon />
      <TextApp style={{ color: getTintColor(status) }}>
        {getLabel(status)}
      </TextApp>
    </View>
  );
}
