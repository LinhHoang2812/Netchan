import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Hero from "../components/Hero";
import Anime from "../components/CategoryAnime";
import { FavoriteFetch, MovieFetch, UpcomingFetch } from "../components/fetch";
import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "../context";
const headLineQuery = () => {
  return {
    queryKey: ["headline"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.jikan.moe/v4/seasons/now?filter=tv&limit=1"
      );
      return response.data.data[0];
    },
  };
};
const popularAnimeQuery = () => {
  return {
    queryKey: ["popular"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=20"
      );
      return response.data.data;
    },
  };
};
const airingAnimeQuery = () => {
  return {
    queryKey: ["airing"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.jikan.moe/v4/top/anime?filter=airing&limit=20"
      );
      return response.data.data;
    },
  };
};

// export const loader = (queryClient) => async () => {
//   const { data: dataHeadline } = await axios.get(
//     "https://api.jikan.moe/v4/seasons/now?filter=tv&limit=1"
//   );
//   const { data: popularAnime } = await axios.get(
//     "https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=20"
//   );
//   const { data: airingAnime } = await axios.get(
//     "https://api.jikan.moe/v4/top/anime?filter=airing&limit=20"
//   );

//   await queryClient.ensureQueryData(headLineQuery());
//   await queryClient.ensureQueryData(popularAnimeQuery());
//   await queryClient.ensureQueryData(airingAnimeQuery());

//   return { result: "loader done" };
// };
export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(headLineQuery());
  await queryClient.ensureQueryData(popularAnimeQuery());
  await queryClient.ensureQueryData(airingAnimeQuery());

  return { result: "loader done" };
};
const Home = () => {
  const { result } = useLoaderData();
  const { data: headlineAnime } = useQuery(headLineQuery());
  const { data: popularAnime } = useQuery(popularAnimeQuery());
  const { data: airingAnime } = useQuery(airingAnimeQuery());
  const { data: upcomingAnime } = UpcomingFetch();
  const { data: favoriteAnime } = FavoriteFetch();
  const { data: movieAnime } = MovieFetch();
  const { setSearch } = useGlobalContext();

  return (
    <section onClick={() => setSearch(false)}>
      {headlineAnime && <Hero headlineAnime={headlineAnime} />}
      {airingAnime && <Anime anime={airingAnime} category={"Airing Anime"} />}

      {upcomingAnime?.data && (
        <Anime anime={upcomingAnime.data} category={"Upcoming Anime"} />
      )}
      {popularAnime && (
        <Anime anime={popularAnime} category={"Popular Anime"} />
      )}

      {favoriteAnime?.data && (
        <Anime anime={favoriteAnime.data} category={"Favorite Anime"} />
      )}
      {movieAnime?.data && (
        <Anime anime={movieAnime.data} category={"Top Movies"} />
      )}
    </section>
  );
};
export default Home;
