import { MaterialIcons } from "@expo/vector-icons";
import {
  Image,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/styles/colors";
import { styles } from "./styles";

import { Link } from "@/components/link";
import { Categories } from "@/components/categories";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity activeOpacity={0.5}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>
      <Categories />

      <FlatList
        data={["1", "2", "3", "4"]}
        keyExtractor={(item) => item}
        renderItem={() => (
          <Link
            name="Rocketseat"
            url="https://app.rocketseat.com.br/"
            onDetails={() => console.log("clicou!")}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>Curso</Text>
              <TouchableOpacity activeOpacity={0.5}>
                <MaterialIcons name="close" size={20} color={colors.gray[400]} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>Rocketseat</Text>

            <Text style={styles.modalUrl}>https://app.rocketseat.com.br/</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
