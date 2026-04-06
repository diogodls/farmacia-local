# Farmacia Popular

Aplicativo mobile em Expo + TypeScript para localizar farmácias populares, pesquisar remédios e salvar favoritos.

## Funcionalidades

- Mapa com marcadores das farmácias populares;
- Busca de remédios com autocomplete;
- Filtro do mapa pelo remédio selecionado;
- Pop-up do marcador com resumo da farmácia;
- Tela de detalhes da farmácia;
- Tela de detalhes do remédio;
- Favoritos com persistência local usando `AsyncStorage`;
- Dados simulados a partir de um mock em JSON.

## Estrutura principal

- `App.tsx`: composição das telas e estado principal.
- `src/components/`: componentes visuais e telas detalhadas.
- `src/hooks/useFavorites.ts`: persistência dos favoritos.
- `src/data/mockBackend.json`: mock do backend com farmácias e remédios.
- `src/data/mockData.ts`: adaptador tipado para consumir o JSON.
- `src/types/pharmacy.ts`: tipagens do projeto.
- `src/styles/theme.ts`: tema visual centralizado.

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o projeto:

```bash
npx expo start
```

## Dependências esperadas

- `expo`
- `react-native-maps`
- `@react-native-async-storage/async-storage`

## Fluxo implementado

1. O usuário pesquisa um remédio no input.
2. O autocomplete mostra sugestões.
3. Ao selecionar um remédio, o mapa é filtrado para as farmácias que possuem esse item.
4. O marcador abre um pop-up com informações resumidas.
5. Ao tocar no pop-up, o usuário abre a tela detalhada da farmácia.
6. O remédio também possui tela própria e pode ser favoritado.
