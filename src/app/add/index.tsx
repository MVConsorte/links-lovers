import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/styles/colors";
import { styles } from "./styles";

import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Add() {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  function handleAdd(){

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        <Text style={styles.title}>Novo</Text>
      </View>

      <Text style={styles.label}>Selecione uma categoria</Text>
      <Categories />

      <View style={styles.form}>
        <Input placeholder="Nome" onChangeText={setName} autoCorrect={false}/>
        <Input placeholder="Url" onChangeText={setUrl} autoCorrect={false}/>
        <Button title="Adicionar" onPress={handleAdd}/>
      </View>
    </SafeAreaView>
  );
}
