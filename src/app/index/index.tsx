import { MaterialIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/styles/colors";
import { styles } from "./styles";
import { Categories } from "@/components/categories";

export default function Index() {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity activeOpacity={0.5}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>
      <View style={styles.subcontainer}>
        <Categories />
      </View>
    </SafeAreaView>
  );
}
