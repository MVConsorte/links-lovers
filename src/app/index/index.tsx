import { MaterialIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/styles/colors";
import { styles } from "./styles";

import { Category } from "@/components/category";

export default function Index() {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity activeOpacity={0.5}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        <Category name="projetos" icon="code" isSelected />
        <Category name="site" icon="language" isSelected />
        <Category name="Video" icon="movie" isSelected = {false} />
      </View>
    </SafeAreaView>
  );
}
