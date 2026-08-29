import { StyleSheet, View } from "react-native";

import { TextApp } from "@/components/ui/TextApp";
import { TextTitle } from "@/components/ui/TextTitle";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <TextTitle>titulo</TextTitle>
      <TextApp>pagina dos :D</TextApp>
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
