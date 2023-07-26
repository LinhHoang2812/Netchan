import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import { styled } from "styled-components";
import YouTube from "react-youtube";
import { useEffect, useState } from "react";
import Recommendation from "../components/Recommendation";
import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";

const singleAnimeQuery = (params) => {
  return {
    queryKey: ["single anime", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.jikan.moe/v4/anime/${params.id}/full`
      );
      return data.data;
    },
  };
};

const episodesQuery = (params) => {
  return {
    queryKey: ["episodes", params.id],
    queryFn: async () => {
      const { data: episodes } = await axios.get(
        `https://api.jikan.moe/v4/anime/${params.id}/episodes`
      );
      return episodes.data;
    },
  };
};

const recommendationsQuery = (params) => {
  return {
    queryKey: ["recommendations", params.id],
    queryFn: async () => {
      const { data: recommendations } = await axios.get(
        `https://api.jikan.moe/v4/anime/${params.id}/recommendations`
      );
      return recommendations.data;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ params }) => {
    await queryClient.ensureQueryData(singleAnimeQuery(params));
    await queryClient.ensureQueryData(episodesQuery(params));
    await queryClient.ensureQueryData(recommendationsQuery(params));

    return {
      params,
    };
  };
const SingleAnime = () => {
  const [full, setFull] = useState(false);
  useEffect(() => {
    setFull(false);
  }, []);
  const { params } = useLoaderData();

  const { data: singleAnime } = useQuery(singleAnimeQuery(params));
  const { data: episodes } = useQuery(episodesQuery(params));
  const { data: recommendations } = useQuery(recommendationsQuery(params));

  if (singleAnime && episodes && recommendations) {
    const {
      images,
      trailer,
      title_english,
      year,
      rating,
      score,
      synopsis,
      streaming,
      type,
      genres,
    } = singleAnime;

    const youtube_id = trailer.youtube_id;
    const opts = {
      playerVars: {
        autoplay: 0,
      },
    };
    const categories = genres.map((genre) => genre.name);
    const img = images.jpg.image_url;

    return (
      <Wrapper>
        <div className="trailer">
          <YouTube videoId={youtube_id} opts={opts} />
        </div>
        <div className="anime-detail">
          <div className="anime-info">
            <div className="info-left">
              <h4 className="title">{title_english}</h4>
              <p className="synopsis">
                {full
                  ? synopsis.slice(0, synopsis.length - 24)
                  : `${synopsis.slice(0, 300)}...`}
                {synopsis.length > 300 && (
                  <button onClick={() => setFull(!full)}>
                    {full ? "Less" : "Readmore"}
                  </button>
                )}
              </p>
            </div>
            <div className="info-right">
              <p>{`Year: ${year ? year : ""}`}</p>
              <p>{`Score: ${score ? score : "unknown"}`}</p>
              <p>{`Rating: ${rating}`}</p>
              <p>
                Categories:
                {categories.map((item, index) => (
                  <span key={item}>{` ${item}${
                    index < categories.length - 1 ? "," : ""
                  }`}</span>
                ))}
              </p>
            </div>
          </div>
          {type !== "Movie" && (
            <div className="anime-episodes">
              <h3>Episodes</h3>
              {episodes.length > 0 ? (
                <div className="all-episodes">
                  {episodes?.map((ep) => (
                    <div
                      key={ep.mal_id}
                      className="episode"
                      style={{
                        backgroundColor: ep.mal_id === 1 ? "#3e3e3e" : null,
                      }}
                    >
                      <p>{ep.mal_id}</p>
                      <div className="img">
                        <img src={img} />
                      </div>

                      <h4>{ep.title}</h4>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Not yet available</p>
              )}
            </div>
          )}
          <div className="anime-streamings">
            <h3>Stream this anime on</h3>
            {streaming.length > 0 ? (
              <div className="all-streamings">
                {streaming.map((stream) => (
                  <Link to={stream.url} key={stream.name}>
                    {stream.name}
                  </Link>
                ))}
              </div>
            ) : (
              <p>Not yet availale</p>
            )}
          </div>
          <div className="anime-recommendations">
            <h3>Similar Anime</h3>
            {recommendations.length > 0 ? (
              <div className="all-recommendations">
                {recommendations.map(({ entry }) => (
                  <Recommendation {...entry} key={nanoid()} />
                ))}
              </div>
            ) : (
              <p>Not yet available</p>
            )}
          </div>
        </div>
      </Wrapper>
    );
  }
};
export default SingleAnime;

const Wrapper = styled.article`
  /* margin-top: 10rem; */
  padding-top: 4rem;
  min-height: 80vh;
  color: #e6e5e5;
  font-size: 0.95rem;
  iframe {
    width: 100%;
    height: 550px;
    box-shadow: 0px 12px 20px -20px rgba(0, 0, 0, 0.75);
  }

  .title {
    font-size: 1.5rem;
    margin-top: 0;
  }
  .anime-detail {
    margin: 2rem;
  }
  .anime-info {
    display: grid;
    grid-template-columns: 3fr 1fr;
    column-gap: 3rem;
  }

  button {
    border: none;
    background-color: transparent;
    color: red;
    cursor: pointer;
    font-size: 0.9rem;
  }
  .all-episodes {
    width: 80%;
    margin: 0 auto;
  }
  .anime-episodes h3 {
    font-size: 1.5rem;
  }
  .episode {
    display: grid;
    grid-template-columns: 0.5fr 1fr 4fr;
    column-gap: 2rem;
  }
  .img img {
    width: 100%;
    height: 150px;
  }

  .episode {
    border-bottom: 2px solid #3e3e3e;
    border-radius: 10px;
    padding: 1rem;
    cursor: pointer;
  }
  .episode p {
    text-align: center;
    font-size: 2.5rem;
  }
  .anime-streamings {
    margin-top: 5rem;
  }
  .anime-streamings h3 {
    font-size: 1.5rem;
  }
  .all-streamings {
    display: flex;
    flex-wrap: wrap;
    row-gap: 1rem;
  }
  .all-streamings a {
    text-decoration: none;
    background-color: red;
    border: 1px solid red;
    margin-right: 2rem;
    color: white;
    padding: 0.5rem;
    border-radius: 10px;
    cursor: pointer;
  }
  .anime-recommendations {
    margin-top: 5rem;
  }
  .anime-recommendations h3 {
    font-size: 1.5rem;
  }

  .all-recommendations {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 2rem;
  }
  @media (max-width: 800px) {
    margin-top: 7rem;
    font-size: 0.9rem;
    iframe {
      height: 250px;
    }
    .anime-detail {
      margin: 1rem;
    }
    .title {
      font-size: 1rem;
    }
    .anime-info {
      grid-template-columns: 1fr;
    }
    .all-episodes {
      width: 100%;
    }
    .anime-episodes h3 {
      font-size: 1rem;
    }
    .episode {
      grid-template-columns: 1fr 2fr 3fr;
    }
    .img img {
      height: 120px;
    }
    .episode p {
      font-size: 1.75rem;
    }
    .anime-streamings h3 {
      margin-top: 1rem;
    }
    .anime-recommendations h3 {
      font-size: 1rem;
    }

    .all-recommendations {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 400px) {
    .all-recommendations {
      grid-template-columns: 1fr;
    }
  }
`;
