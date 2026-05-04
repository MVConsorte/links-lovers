import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { linkStorage } from "@/storage/link-storage";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

import { Button } from "@/components/button";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";

export default function Add() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  async function handleAdd() {
    try {
      if (!category) {
        return Alert.alert("Categoria", "Selecione a categoria primeiro");
      }
      if (!name.trim()) {
        return Alert.alert("Nome", "Informe o nome");
      }
      if (!url.trim()) return Alert.alert("URL", "Informe a URL");

      await linkStorage.save({
        id: new Date().getTime().toString(), // id baseado no timestamp atual
        name,
        url,
        category
      })

      Alert.alert("Sucesso", "Novo Link adicionado", [
        {
          text: "OK", 
          onPress: () => router.back()
        },
      ])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o link");
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.5}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        <Text style={styles.title}>Novo</Text>
      </View>

      <Text style={styles.label}>Selecione uma categoria</Text>
      <Categories onChange={setCategory} selected={category} />

      <View style={styles.form}>
        <Input 
          placeholder="Nome" 
          onChangeText={setName} 
          autoCorrect={false} 
        />
        <Input 
          placeholder="URL" 
          onChangeText={setUrl} 
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
    </SafeAreaView>
  );
}
