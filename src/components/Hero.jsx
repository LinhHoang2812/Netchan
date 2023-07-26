import { styled } from "styled-components";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import { useEffect } from "react";
const Hero = ({ headlineAnime }) => {
  const { title, trailer, status, synopsis, mal_id } = headlineAnime;
  const youtube_id = trailer.youtube_id;
  let opts = {
    width: 890,
    height: 520,
    playerVars: {
      autoplay: 1,
    },
  };
  if (window.innerWidth < 800) {
    opts = {
      width: 0,
      height: 0,
      playerVars: {
        autoplay: 0,
      },
    };
  }

  // useEffect(() => {
  //   if (window.innerWidth < 800) {
  //     opts = {
  //       width: 0,
  //       height: 0,
  //       playerVars: {
  //         autoplay: 0,
  //       },
  //     };
  //   }
  // }, []);

  return (
    <Wrapper>
      <div className="info">
        <h3>{title}</h3>
        <h4>{status}</h4>
        <p>{synopsis}</p>
        <Link to={`/anime/${mal_id}`}>
          <button className="btn">More info</button>
        </Link>
      </div>
      <div className="trailer">
        <YouTube videoId={youtube_id} opts={opts} />
      </div>
    </Wrapper>
  );
};
export default Hero;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.2fr;
  gap: 0.5rem;
  border-radius: 7px;
  height: 520px;
  border: 2px solid gray;
  text-decoration: none;
  color: white;
  position: relative;
  @media (max-width: 800px) {
    display: none;
  }

  .info {
    line-height: 1.5;
    letter-spacing: 2px;
    align-self: end;
    padding: 3rem 2rem;
  }
  .info h3 {
    font-size: 1.7rem;
  }

  .trailer {
    overflow: hidden;
  }
  iframe {
    width: 890px;
    height: 520px;
  }
  .btn {
    width: 120px;
    height: 30px;
    border-radius: 7px;
    background-color: #f0ecec3b;
    border: transparent;
    color: white;
    letter-spacing: 2px;
    font-size: 0.9rem;
    cursor: pointer;
  }
`;
