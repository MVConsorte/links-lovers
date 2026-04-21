import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  subcontainer: {
    marginTop: 24
  },
  header: {
    paddingHorizontal: 24,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 40,
    color: colors.green[900],
    fontWeight: "bold",
  },
  logo: {
    height: 32,
    width: 38,
  },
  links: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[600],
  },
  linksContent: {
    gap: 20,
    padding: 24,
    paddingBottom: 100,
  }
});
