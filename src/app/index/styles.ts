import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container_inline: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20
  },
  title: {
    fontSize: 40,
    color: colors.green[900],
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    color: colors.gray[400],
  },
});
