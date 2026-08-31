/* COMPONENTS */
import { Title } from "@/content/shared/components/title/Title";
import { TextApp } from "@/content/shared/ui/text/TextApp";
import { Pressable, ScrollView, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

/* ICONS */
import { Download, SlidersHorizontal } from "lucide-react-native";

/* THEME */
import { useTheme } from "@/theme/ThemeContext";

export function StatsContent() {
  const { theme } = useTheme();

  const data = [
    { value: 40, color: "#4CAF50" },
    { value: 30, color: "#FFC107" },
    { value: 20, color: "#F44336" },
    { value: 10, color: "#9E9E9E" },
  ];

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
              style={{ backgroundColor: theme.primary }}
            >
              <SlidersHorizontal size={20} color={theme.primary_txt} />
            </Pressable>
            <Pressable
              className="items-center justify-center flex-1 p-4 rounded-full"
              style={{ backgroundColor: theme.primary }}
            >
              <Download size={20} color={theme.primary_txt} />
            </Pressable>
          </View>
        </View>

        <View className="bg-neutral-800">
          <PieChart data={data} radius={100} />

          <App />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Graph({}: {}) {
  return <View></View>;
}

const App = () => {
  const { theme } = useTheme();
  const pieData = [
    {
      value: 47,
      color: "#009FFF",
      focused: true,
    },
    { value: 40, color: "#93FCF8" },
    { value: 16, color: "#BDB2FA" },
    { value: 3, color: "#FFA5BA" },
  ];

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#006DFF")}
            <Text style={{ color: "white" }}>Excellent: 47%</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#8F80F3")}
            <Text style={{ color: "white" }}>Okay: 16%</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#3BE9DE")}
            <Text style={{ color: "white" }}>Good: 40%</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#FF7F97")}
            <Text style={{ color: "white" }}>Poor: 3%</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        paddingVertical: 100,
        backgroundColor: "#34448B",
        flex: 1,
      }}
    >
      <View
        style={{
          margin: 20,
          padding: 16,
          borderRadius: 20,
          backgroundColor: "#232B5D",
        }}
      >
        <TextApp
          className="mb-4 text-xl"
          style={{ fontFamily: "DMSans_700Bold", color: theme.ink }}
        >
          Reportes
        </TextApp>
        <View className="items-center p-4 bg-red-500">
          <PieChart
            data={pieData}
            donut
            showGradient
            radius={100}
            innerRadius={70}
            innerCircleColor={"#232B5D"}
            centerLabelComponent={() => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
                  >
                    47%
                  </Text>
                  <Text style={{ fontSize: 14, color: "white" }}>
                    Excellent
                  </Text>
                </View>
              );
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
};
