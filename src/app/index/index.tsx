import { styles } from "@/app/index/styles";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.container_inline}>
        <Text style={styles.subtitle}>
          <Text>MVConsorte: </Text>
          <Text>Bem vindo ao seu primeiro...</Text>
        </Text>
      </View>
      <Text style={styles.title}>Hello, World!</Text>
    </View>
  );
}
