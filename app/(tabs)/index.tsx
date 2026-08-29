import { StyleSheet, Text } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { View } from "@/components/Themed";
import { TextApp } from "@/components/ui/TextApp";
import { TextTitle } from "@/components/ui/TextTitle";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap #1</Text>
      <Text className="text-5xl text-blue-500 bg-red-500">Hola mundo</Text>
      <TextTitle>Titulo</TextTitle>
      <TextApp>Este es un texto normal</TextApp>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
