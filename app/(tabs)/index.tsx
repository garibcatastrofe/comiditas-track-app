import { StyleSheet, View } from "react-native";

import { TextApp } from "@/components/ui/TextApp";
import { TextTitle } from "@/components/ui/TextTitle";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <TextTitle>titulo</TextTitle>
      <TextApp>texto normal :d</TextApp>
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
