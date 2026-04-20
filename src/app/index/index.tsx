import {Text, View, StyleSheet} from "react-native";
import {styles} from "./styles";

export default function Index() {
    return (
    <View style={styles.container}>
      <View style={styles.container_inline}>
        <Text style = {{color: "gray"}}>
            <Text>MVConsorte: </Text>
            <Text>Bem vindo ao seu primeiro...</Text>
        </Text>
      </View>
      <Text style={styles.title}>Hello, World!</Text>
      <Text>Bem vindo à primeira visualização do MVConsorte!</Text>
      <Text>App React Native</Text>
    </View>
    )
};

