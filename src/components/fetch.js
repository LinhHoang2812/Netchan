import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const UpcomingFetch = () => {
  const { data } = useQuery({
    queryKey: ["upcoming"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=20"
      );
      return response.data;
    },
  });
  return { data };
};

export const FavoriteFetch = () => {
  const { data } = useQuery({
    queryKey: ["favorite"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.jikan.moe/v4/top/anime?filter=favorite&limit=20"
      );
      return response.data;
    },
  });
  return { data };
};

export const MovieFetch = () => {
  const { data } = useQuery({
    queryKey: ["movie"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.jikan.moe/v4/top/anime?type=movie&limit=20"
      );
      return response.data;
    },
  });
  return { data };
};
