# Farmacia Popular

Aplicativo mobile em Expo + TypeScript para localizar farmacias populares, pesquisar remedios e salvar favoritos.

## Funcionalidades

- Mapa com marcadores das farmacias populares.
- Busca de remedios com autocomplete.
- Filtro do mapa pelo remedio selecionado.
- Pop-up do marcador com resumo da farmacia.
- Tela de detalhes da farmacia.
- Tela de detalhes do remedio.
- Favoritos com persistencia local usando `AsyncStorage`.
- Dados carregados pela API NestJS conectada ao banco Neon.

## Estrutura principal

- `App.tsx`: composicao das telas e estado principal.
- `src/components/`: componentes visuais e telas detalhadas.
- `src/hooks/useFavorites.ts`: persistencia dos favoritos.
- `src/hooks/useCatalogData.ts`: carga inicial dos dados vindos da API.
- `src/services/api.ts`: cliente HTTP e resolucao da URL base.
- `src/types/pharmacy.ts`: tipagens do projeto.
- `src/styles/theme.ts`: tema visual centralizado.

## Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Defina a URL da API quando necessario:

```bash
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3001/api
```

Se a variavel nao for definida, o app tenta descobrir automaticamente o host da maquina de desenvolvimento e usar a porta `3001`.

3. Inicie o projeto:

```bash
npx expo start
```

## Dependencias esperadas

- `expo`
- `react-native-maps`
- `@react-native-async-storage/async-storage`

## Fluxo implementado

1. O usuario pesquisa um remedio no input.
2. O autocomplete mostra sugestoes.
3. Ao selecionar um remedio, o mapa e filtrado para as farmacias que possuem esse item.
4. O marcador abre um pop-up com informacoes resumidas.
5. Ao tocar no pop-up, o usuario abre a tela detalhada da farmacia.
6. O remedio tambem possui tela propria e pode ser favoritado.
