import { TextApp } from "@/content/shared/components/textApp/TextApp";
import { useTheme } from "@/theme/ThemeContext";
import { Check, CircleQuestionMark, Minus, X } from "lucide-react-native";
import { Pressable, View } from "react-native";

export function MealStatusSelector({
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
              status === "excelent" ? theme.success_bg : theme.surface,
          }}
          onPress={() => changeMealStatus("excelent", meal)}
        >
          <Check
            size={20}
            color={status === "excelent" ? theme.success : theme.muted}
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
            backgroundColor: status === "empty" ? theme.info_bg : theme.surface,
          }}
          onPress={() => changeMealStatus("empty", meal)}
        >
          <CircleQuestionMark
            size={20}
            color={status === "empty" ? theme.info : theme.muted}
          />
        </Pressable>
      </View>
    </View>
  );
}
