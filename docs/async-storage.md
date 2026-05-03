# Async Storage no React Native

## O que e o Async Storage

O Async Storage e uma biblioteca oficial da comunidade React Native para armazenamento local, persistente e assincorno, baseada em chave e valor (key-value). Ele funciona como um pequeno banco de dados simples, ideal para guardar configuracoes, preferencia do usuario, tokens de autenticacao, flags de onboarding, e caches leves.

No ecossistema React Native, o Async Storage substitui o antigo "AsyncStorage" que existia no core e foi descontinuado. Hoje, ele vive no pacote:

- @react-native-async-storage/async-storage

## Por que ele existe

Aplicativos mobile precisam gravar dados locais mesmo quando o app e fechado. O Async Storage resolve isso de forma:

- Assincrona: nao bloqueia a UI enquanto le ou grava.
- Persistente: os dados permanecem entre reinicializacoes do app.
- Simples: API baseada em strings e chaves.

Ele nao e indicado para grandes volumes de dados, consultas complexas, ou dados altamente estruturados. Para isso, bancos locais (SQLite, WatermelonDB, Realm) sao mais adequados.

## Como ele funciona

O Async Storage armazena dados como pares de chave e valor, onde tanto a chave quanto o valor sao strings. Para guardar objetos, voce deve serializar em JSON.

Operacoes principais:

- setItem(chave, valor) -> grava
- getItem(chave) -> le
- removeItem(chave) -> remove
- multiSet / multiGet -> opera em lote
- clear() -> apaga tudo

Todas as operacoes retornam Promises.

## Async Storage no contexto do React Native

No React Native, o Async Storage e usado para:

- Manter sessao do usuario (ex: tokens)
- Salvar preferencias (tema, idioma, layout)
- Cache simples de dados (ex: ultima lista carregada)
- Flags de UI (ex: ja viu o onboarding)

Por ser assincorno, ele nao deve ser chamado em render diretamente. O comum e usar hooks e carregar dados no useEffect, ou encapsular tudo em um servico de armazenamento.

## Boas praticas

- Use uma unica camada de acesso (ex: um arquivo de storage) para centralizar as chaves.
- Padronize chaves (ex: "@app:token").
- Serialize objetos com JSON.stringify e JSON.parse.
- Trate erros (try/catch) e retorno nulo do getItem.
- Evite gravar dados sensiveis sem criptografia.

## Exemplo basico

```ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@links-lovers:token";

export async function saveToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function loadToken() {
  const value = await AsyncStorage.getItem(TOKEN_KEY);
  return value ?? null;
}

export async function removeToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}
```

## Limites e cuidados

- Nao ha garantias de desempenho para grandes volumes.
- Nao e um banco relacional, nao suporta consultas.
- Dependendo da plataforma, o storage pode ter limites de tamanho.

## Onde ler mais

- Documentacao oficial: <https://react-native-async-storage.github.io/2.0/Usage/>
