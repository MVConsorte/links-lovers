# Variáveis e Estados no React/React Native

Em React e React Native, a maneira como gerenciamos os dados que mudam ao longo do tempo é fundamental para construir interfaces de usuário (UIs) dinâmicas e reativas. Para isso, temos dois conceitos principais: **variáveis** e **estados (states)**. Embora ambos possam armazenar valores, eles têm propósitos e comportamentos muito distintos.

## O que são Variáveis?

Variáveis em componentes React/React Native são as mesmas variáveis JavaScript que já conhecemos. Elas são declaradas usando `let` ou `const` e podem armazenar qualquer tipo de dado.

```javascript
const nome = "João";
let idade = 25;
```

No contexto de um componente React, uma variável é local para a renderização atual daquele componente. Isso significa que:

- **Seu valor é recriado a cada renderização:** Toda vez que o componente é renderizado novamente, as variáveis dentro dele são reinicializadas.
- **A alteração de seu valor não causa uma nova renderização:** Se você modificar o valor de uma variável, o React **não** irá renderizar o componente novamente para refletir essa mudança na UI.

### Como o sistema enxerga as variáveis?

Para o React, uma variável é apenas um valor temporário usado durante a execução da função do componente. O React não monitora suas alterações. Do ponto de vista do ciclo de vida do componente, a variável "morre" e "nasce" a cada renderização.

**Exemplo prático:**

```jsx
import React from "react";
import { View, Text, Button } from "react-native";

export default function ExemploVariavel() {
  let contador = 0;

  function incrementar() {
    contador = contador + 1;
    console.log(contador); // O valor no console será atualizado
  }

  return (
    <View>
      <Text>Contador: {contador}</Text> // O valor na tela sempre será 0
      <Button title="Incrementar" onPress={incrementar} />
    </View>
  );
}
```

Neste exemplo, ao clicar no botão, o valor de `contador` é incrementado e o novo valor é exibido no console. No entanto, o texto na tela (`<Text>`) continuará mostrando "Contador: 0", pois a alteração da variável não dispara uma nova renderização do componente.

## O que são Estados (States)?

O **estado** é a maneira como o React gerencia dados que mudam com o tempo e que devem ser refletidos na UI. Para gerenciar estados em componentes de função, utilizamos o hook `useState`.

O `useState` é uma função do React que nos permite "conectar" um valor ao ciclo de vida do componente. Ele retorna um array com duas posições:

1.  O valor atual do estado.
2.  Uma função para atualizar esse valor.

```javascript
import { useState } from "react";

const [contador, setContador] = useState(0);
```

### Como o sistema enxerga os estados?

Diferente das variáveis, o React "lembra" do valor de um estado entre as renderizações. Quando a função de atualização (como `setContador`) é chamada:

1.  **O React agenda uma nova renderização do componente:** Ele entende que um dado importante mudou e que a UI precisa ser atualizada.
2.  **O valor do estado é preservado:** Na próxima renderização, o `useState` retornará o novo valor que foi definido.
3.  **Reconciliação:** O React compara a nova árvore de elementos com a anterior e atualiza o DOM (ou a view nativa) apenas com as partes que mudaram, tornando o processo eficiente.

**Exemplo prático:**

```jsx
import React, { useState } from "react";
import { View, Text, Button } from "react-native";

export default function ExemploEstado() {
  const [contador, setContador] = useState(0);

  function incrementar() {
    setContador(contador + 1);
  }

  return (
    <View>
      <Text>Contador: {contador}</Text> // O valor na tela será atualizado
      <Button title="Incrementar" onPress={incrementar} />
    </View>
  );
}
```

Neste caso, ao clicar no botão, a função `setContador` é chamada. O React agenda uma nova renderização, e na próxima execução do componente, a variável `contador` terá o novo valor, que será refletido na tela.

## Diferenças Fundamentais

| Característica      | Variáveis (`let`, `const`)                                | Estados (`useState`)                                       |
| ------------------- | --------------------------------------------------------- | ---------------------------------------------------------- |
| **Re-renderização** | A alteração do valor **não** causa uma nova renderização. | A alteração do valor **causa** uma nova renderização.      |
| **Ciclo de Vida**   | O valor é perdido e recriado a cada renderização.         | O valor é preservado pelo React entre as renderizações.    |
| **Propósito**       | Armazenar valores temporários dentro de uma renderização. | Armazenar dados que afetam a UI e persistem no componente. |
| **Atualização**     | Atribuição direta (ex: `contador = 1`).                   | Usando a função de atualização (ex: `setContador(1)`).     |

## Vantagens de Usar States e Padrões de Projeto

O uso de estados não é apenas uma conveniência; ele está diretamente ligado aos princípios fundamentais do React e se relaciona com padrões de projeto de software.

### 1. Princípio da UI Declarativa

O React popularizou a ideia de **UI declarativa**. Em vez de dar um passo a passo de como a UI deve mudar (programação imperativa), você "declara" como a UI deve se parecer para um determinado estado.

- **Imperativo:** "Vá até o elemento com ID 'contador', pegue seu valor, some 1 e coloque o resultado de volta."
- **Declarativo (React):** "A UI para este componente é um texto que exibe o valor atual de `contador`."

O `useState` é a ferramenta que torna isso possível. A UI é uma **função do estado** (`UI = f(state)`). Quando o estado muda, a função é executada novamente, gerando uma nova representação da UI.

### 2. Padrão de Projeto: Observer (Observador)

O `useState` implementa uma forma do padrão **Observer**. Nesse padrão, um objeto (o "subject" ou "observado") mantém uma lista de seus dependentes (os "observers") e os notifica automaticamente sobre quaisquer mudanças de estado.

- **Observado (Subject):** O estado gerenciado pelo React.
- **Observador (Observer):** O componente.

Quando o estado muda (através da função `set...`), o React (que atua como mediador) notifica o componente de que ele precisa ser atualizado (renderizado novamente). Isso desacopla a lógica de negócio da lógica de renderização.

### 3. Unidirectional Data Flow (Fluxo de Dados Unidirecional)

O React impõe um fluxo de dados unidirecional. Os dados (estados) fluem de cima para baixo (de componentes pais para filhos via `props`). As ações para modificar esses dados fluem de baixo para cima (de filhos para pais via callbacks).

O `useState` é a fonte primária desses dados. Manter os dados como "estados" em vez de variáveis garante que esse fluxo seja respeitado e que a aplicação se comporte de maneira previsível.

### 4. Hooks como um Padrão de Composição

Os hooks, como o `useState`, `useEffect`, etc., podem ser vistos como uma forma de aplicar o **Padrão Decorator** ou **Strategy** de uma maneira mais funcional. Eles permitem "decorar" ou adicionar "estratégias" (comportamentos como gerenciamento de estado, efeitos colaterais, etc.) a um componente de função sem alterar sua estrutura ou hierarquia. Isso promove a reutilização de lógica e a composição de funcionalidades complexas a partir de peças menores e isoladas.

## Conclusão

Usar **variáveis** é apropriado para cálculos temporários e dados que não precisam ser lembrados entre renderizações e não afetam a aparência da UI. Para qualquer dado que, ao ser alterado, deva atualizar o que o usuário vê na tela, o **estado (`useState`)** é a ferramenta correta e fundamental, pois ele se integra ao ciclo de vida e ao motor de renderização do React, permitindo a construção de interfaces reativas e declarativas.
