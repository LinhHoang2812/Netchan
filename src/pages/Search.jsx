import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { styled } from "styled-components";
import Card from "../components/Card";
import SwiperCard from "../components/SwiperCard";
import { isMobile } from "detect-touch-device";

const searchAnimeQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const { data: searchAnime } = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${searchTerm}`
      );
      return searchAnime.data;
    },
  };
};
export const loader =
  (clientQuery) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search") || "";
    await clientQuery.ensureQueryData(searchAnimeQuery(searchTerm));
    return { searchTerm };
  };

const Search = () => {
  const { searchTerm } = useLoaderData();
  const { data: searchAnime } = useQuery(searchAnimeQuery(searchTerm));

  return (
    <Wrapper>
      {searchAnime &&
        searchAnime.map((anime) =>
          isMobile ? <SwiperCard {...anime} /> : <Card {...anime} />
        )}
    </Wrapper>
  );
};
export default Search;

const Wrapper = styled.div`
  margin-top: 10rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
  column-gap: 0.5rem;
  padding: 0 2rem;
  .netchan-card:hover {
    transform: scale(1.5);
    width: 210px;
    height: 230px;
  }
  .card-trailer {
    transform-origin: top;
  }
  .card-info {
    transform-origin: top;
  }
  .netchan-card:hover .card-trailer {
    transform: scaleY(0.8);
  }
  .netchan-card:hover .card-info {
    transform: scale(0.667);
  }
  iframe {
    width: 100%;
    height: 100%;
  }
  .netchan-card:hover .card-info {
    margin: -2rem;
  }

  .icon {
    margin: 1rem;
  }
  .more-info {
    display: none;
  }
  @media (max-width: 800px) {
    margin-top: 7rem;
    grid-template-columns: 1fr 1fr;
    .netchan-touch-card {
      height: 180px;
    }
  }

  .netchan-touch-card {
    height: 200px;
  }
`;
