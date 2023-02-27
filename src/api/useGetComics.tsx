import { useQuery } from "react-query";
import useMarvelQueries from "./useMarvelQueries";

export default function useGetComics(props: useGetComicsProps) {
  const { limit, activePage, characterId } = props;
  const { fetchComics } = useMarvelQueries();

  const { isLoading, error, data } = useQuery(
    ["fetchComics", characterId, activePage],
    fetchComics.bind(null, { limit, activePage, characterId })
  );

  return {
    isLoading,
    error,
    data,
  };
}

type useGetComicsProps = {
  limit: number;
  activePage: number;
  characterId: number;
};
