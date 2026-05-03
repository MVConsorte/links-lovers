# Assincronicidade em JavaScript/TypeScript

## Visao geral

JavaScript e TypeScript sao baseados em um modelo assincorno por natureza: enquanto uma operacao espera (rede, disco, timers), o resto do codigo continua executando. Isso evita travar a UI (em web) e ajuda a manter apps React Native responsivos.

Assincronicidade em JS/TS e construida principalmente sobre:

- Promises
- async/await
- callbacks
- event loop (fila de tarefas)

## Promises

Uma Promise representa um valor que pode chegar no futuro. Ela tem tres estados:

- pending: ainda nao resolvida
- fulfilled: resolvida com sucesso
- rejected: falhou com erro

### Criando uma Promise

```ts
const p = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("ok");
  }, 1000);
});
```

### Consumindo uma Promise

```ts
p.then((value) => {
  console.log(value);
})
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log("sempre executa");
  });
```

## async e await

- `async` transforma uma funcao em uma funcao que retorna Promise.
- `await` pausa a execucao da funcao `async` ate a Promise resolver ou rejeitar.

```ts
async function loadUser(id: string) {
  const response = await fetch(`https://api.exemplo.com/users/${id}`);
  const data = await response.json();
  return data;
}
```

Detalhes importantes:

- `await` so pode ser usado dentro de funcoes `async`.
- Uma funcao `async` sempre retorna Promise.
- `await` nao bloqueia a thread principal, ele so pausa dentro da funcao.

## Tratamento de erros

Com Promises:

```ts
fetch("/api")
  .then((res) => res.json())
  .catch((err) => console.error(err));
```

Com async/await:

```ts
async function run() {
  try {
    const res = await fetch("/api");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
```

## Concurrency com Promises

### Promise.all

Executa varias Promises em paralelo e falha se alguma falhar.

```ts
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
```

### Promise.allSettled

Espera todas terminarem, mesmo com falhas.

```ts
const results = await Promise.allSettled([taskA(), taskB()]);
```

### Promise.race

Retorna a primeira que resolver ou rejeitar.

```ts
const first = await Promise.race([fast(), slow()]);
```

### Promise.any

Retorna a primeira que resolver com sucesso (ignora rejeicoes ate acabar).

```ts
const value = await Promise.any([source1(), source2()]);
```

## Callbacks (assincrono antigo)

Antes de Promises, era comum passar funcoes de callback:

```ts
readFile("file.txt", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

Problema comum: "callback hell" (muitos aninhamentos). Promises e async/await ajudam a evitar isso.

## Event Loop e filas

O JavaScript roda em uma unica thread principal. O Event Loop gerencia a execucao das tarefas:

- **Call Stack**: pilha de execucao atual.
- **Task Queue** (macrotasks): timers, IO, eventos.
- **Microtask Queue**: Promises resolvidas, `queueMicrotask`.

Regras basicas:

1. Executa tudo que esta no Call Stack.
2. Processa todas as microtasks.
3. Processa a proxima macrotask.

Exemplo:

```ts
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

Ordem:

- A
- D
- C
- B

## Timers principais

- `setTimeout(fn, ms)` -> executa uma vez depois do tempo.
- `setInterval(fn, ms)` -> executa repetidamente.
- `clearTimeout` / `clearInterval` -> cancela.

## for await...of

Itera sobre valores assincornos (ex: streams, arrays de Promises).

```ts
async function runAll(tasks: Array<Promise<number>>) {
  for await (const n of tasks) {
    console.log(n);
  }
}
```

## Generators assincornos

Generators permitem gerar valores sob demanda. Versao async:

```ts
async function* streamValues() {
  yield 1;
  await new Promise((r) => setTimeout(r, 100));
  yield 2;
}

for await (const v of streamValues()) {
  console.log(v);
}
```

## Cancelamento com AbortController

Para cancelar requisicoes (ex: fetch), use `AbortController`:

```ts
const controller = new AbortController();

const promise = fetch("/api", { signal: controller.signal });

controller.abort();
```

## TypeScript e assincronicidade

TypeScript nao muda o comportamento, mas ajuda com tipos:

```ts
async function getUser(): Promise<User> {
  const res = await fetch("/user");
  return (await res.json()) as User;
}
```

Boas praticas:

- Sempre tipar o retorno de funcoes async.
- Evitar `any` em Promises.
- Preferir `Promise.all` para concorrencia real.

## Resumo rapido

- Promises sao a base da assincronicidade moderna.
- async/await simplifica a leitura.
- Event loop define a ordem real de execucao.
- Concurrency deve ser controlada com cuidado.
- Cancelamento e importante em UIs (evita estado inconsistente).
