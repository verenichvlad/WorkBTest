import CryptoJS from "crypto-js";
import ky from "ky";

export default function useMarvelQueries() {
  const apiUrl = "https://gateway.marvel.com/v1/public";
  const marvelPublicApi = ky.extend({ prefixUrl: apiUrl });

  return {
    fetchComics,
    fetchCharacters,
  };

  function fetchComics(params: FetchComicsParams): Promise<MarvelRes<Comics>> {
    const { limit, characterId, activePage } = params;

    const searchParams = {
      ...getMarvelAuthSearchParams(),
      limit,
      offset: limit * activePage,
    };

    return marvelPublicApi
      .get(`characters/${characterId}/comics`, { searchParams })
      .json();
  }

  function fetchCharacters(
    params: FetchCharactersParams
  ): Promise<MarvelRes<Character>> {
    const searchParams = {
      ...getMarvelAuthSearchParams(),
      limit: params.limit,
    };

    return marvelPublicApi.get("characters", { searchParams }).json();
  }
}

function getMarvelAuthSearchParams() {
  if (
    !import.meta.env.VITE_APP_PUBLIC_KEY ||
    !import.meta.env.VITE_APP_PRIVATE_KEY
  ) {
    throw new Error("API keys need to be defined");
  }

  const timestamp = Date.now();
  const stringToBeHashed = `${timestamp}${
    import.meta.env.VITE_APP_PRIVATE_KEY
  }${import.meta.env.VITE_APP_PUBLIC_KEY}`;

  const hash = CryptoJS.MD5(stringToBeHashed).toString();

  return {
    ts: timestamp,
    apikey: import.meta.env.VITE_APP_PUBLIC_KEY,
    hash,
  };
}

type FetchComicsParams = {
  limit: number;
  characterId: number;
  activePage: number;
};

type FetchCharactersParams = {
  limit: number;
};

type MarvelRes<T> = {
  data: {
    count: number;
    limit: number;
    offset: number;
    total: number;
    results: T[];
  };
};

type Character = {
  id: number;
  name: string;
};

export type Comics = {
  id: number;
  title: string;
  images: Image[];
  description: string;
  creators: { items: Creator[] };
  dates: ComicsDate[];
};

type Creator = {
  name: string;
  role: "writer";
  resourceURI: string;
};

type ComicsDate = {
  date: string;
  type: "onsaleDate";
};

type Image = {
  extension: "jpg" | "png";
  path: string;
};
