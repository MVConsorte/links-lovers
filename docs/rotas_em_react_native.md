# Navegação e Rotas no React Native

A navegação em dispositivos móveis difere fundamentalmente da navegação na Web. Enquanto navegadores utilizam um histórico baseado em URLs lineares, aplicativos mobile utilizam o conceito de **Pilha de Navegação (Navigation Stack)**.

## 1. A Teoria: O Conceito de Pilha (Stack)

O modelo mais comum no React Native é o **Stack Navigation**. Ele opera sob o princípio **LIFO (Last In, First Out)** — o último elemento a entrar é o primeiro a sair.

### Estados da Pilha

- **Push (Empurrar):** Quando você navega para uma nova tela, o sistema cria uma nova instância dessa tela e a coloca no topo da pilha. A tela anterior permanece "viva" na memória, porém coberta.
- **Pop (Retirar):** Quando você volta, a tela do topo é destruída (desmontada) e a tela imediatamente abaixo é revelada, mantendo o estado em que estava.

## 2. Implementação com Expo Router

O Expo Router introduz o **Roteamento Baseado em Arquivos**, similar ao Next.js, onde a estrutura de pastas define as rotas.

### Exemplo Prático: Fluxo Index -> Add

#### Tela Principal (`app/index.tsx`)

Para avançar na pilha, utilizamos `router.navigate` ou `router.push`.

```tsx
import { useRouter } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View>
      <Text>Tela Inicial</Text>
      <TouchableOpacity onPress={() => router.navigate("/add")}>
        <Text>Ir para Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}
```

#### Tela de Adição (`app/add.tsx`)

Para retornar, utilizamos `router.back()`. Isso garante que a instância anterior da tela `index` seja restaurada em vez de uma nova ser criada.

```tsx
import { useRouter } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";

export default function Add() {
  const router = useRouter();

  return (
    <View>
      <Text>Tela de Adição</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## 3. Aspectos Técnicos Avançados

### Diferença entre Navigate, Push e Replace

1.  **`router.navigate(path)`:** Tenta encontrar uma rota existente na pilha. Se a tela já estiver aberta, ele apenas volta para ela. É mais performático para evitar duplicação.
2.  **`router.push(path)`:** Força a criação de uma nova entrada no topo da pilha, mesmo que você já esteja naquela rota.
3.  **`router.replace(path)`:** Substitui a tela atual pela nova. A tela anterior é removida da pilha e não é possível usar o "voltar" para retornar a ela. Ideal para fluxos de Login ou Splash Screens.

### Ciclo de Vida e Memória

Diferente da Web, onde mudar de página desmonta o componente anterior, no Mobile a tela de baixo da pilha **continua montada**.

- **useEffect:** O `useEffect` de uma tela `index` não será disparado novamente quando você volta da tela `add`, pois o componente nunca foi desmontado.
- **Foco:** Para detectar que o usuário voltou para a tela, utilizamos hooks específicos como `useFocusEffect` do Expo/React Navigation.

### Ponte Nativa (The Native Bridge)

A navegação no React Native não é apenas uma troca de componentes JavaScript. Ela se comunica com as APIs nativas:

- **iOS:** Utiliza `UINavigationController`.
- **Android:** Gerencia o `Fragment Backstack`.

Isso garante que gestos nativos (como deslizar a borda da tela no iOS para voltar) funcionem automaticamente, proporcionando a experiência "nativa" esperada pelo usuário.

## 4. Organização de Arquivos (Layouts)

O arquivo `_layout.tsx` é fundamental. Ele define como as telas são renderizadas (como uma Pilha, Abas/Tabs ou Gaveta/Drawer).

```tsx
// app/_layout.tsx
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add" />
    </Stack>
  );
}
```
eturn (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add" />
    </Stack>
  );
}
```
