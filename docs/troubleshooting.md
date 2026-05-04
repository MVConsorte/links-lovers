# Troubleshooting

## Android iniciava na rota /add ao inves do index

### Sintomas

- No Android o app abria diretamente em `/add`.
- No iOS abria corretamente na tela inicial.
- Nao havia `app/index.tsx`.

### Como foi identificado

- O expo-router resolve rotas a partir da estrutura de arquivos em `app/`.
- Quando a rota raiz nao existe, a tela inicial pode variar por plataforma.
- O problema sumiu quando foi definida uma rota inicial explicita.

### Por que ocorreu

- A rota raiz (`/`) nao estava definida de forma explicita.
- O arquivo principal estava em `app/index/index.tsx`.
- Sem rota inicial, o Android escolheu outra rota (por ordem interna), caindo em `/add`.

### Como foi corrigido

- Foi definido o `initialRouteName` no Stack do layout:

```tsx
<Stack initialRouteName="index/index" />
```

### Outra opcao de solucao (mais alinhada ao padrao do expo-router)

- Mover a tela inicial para `app/index.tsx` e deixar `app/index/` apenas para rotas filhas.

Exemplo de estrutura:

```
app/
	index.tsx
	add/
		index.tsx
```

### Por que essa opcao funciona

- A rota raiz `/` fica definida de forma explicita.
- Evita comportamento inconsistente entre plataformas.
- Dispensa configurar `initialRouteName` quando a estrutura segue o padrao.

### Por que a correcao funcionou

- O `initialRouteName` garante qual tela deve abrir primeiro, independente da plataforma.
- Isso elimina a dependencia da ordem interna do roteamento e torna o comportamento deterministico.
