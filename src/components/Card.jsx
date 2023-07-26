import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import { useState } from "react";
import { styled } from "styled-components";
import { FaInfoCircle } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
const Card = ({ title, images, mal_id, trailer, genres }) => {
  const cat = genres.map((genre) => genre.name);
  const [isHover, setHover] = useState(false);
  const opts = {
    width: 300,
    height: 220,
    playerVars: {
      autoplay: 1,
      mute: 0,
    },
  };

  return (
    <Wrapper
      className="netchan-card"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="card-img" style={{ display: isHover ? "none" : "block" }}>
        <img src={images.jpg.image_url} />
      </div>
      <div className="card-trailer">
        {isHover && (
          <YouTube
            videoId={trailer.youtube_id}
            opts={opts}
            className="trailer"
          />
        )}
      </div>

      <div className="card-info">
        <h4>{title}</h4>
        <div className="detail">
          <p>
            {cat.map((item) => (
              <span key={item}>{`${item} `}</span>
            ))}
          </p>
          <Link
            to={`/anime/${mal_id}`}
            className="icon"
            data-tooltip-id={`my-tooltip${mal_id}`}
            data-tooltip-content="More info"
            data-tooltip-place="top"
          >
            <FaInfoCircle />
          </Link>
          <Tooltip id={`my-tooltip${mal_id}`} className="more-info" />
        </div>
      </div>

      {!isHover && <h4 className="title">{title}</h4>}
    </Wrapper>
  );
};
export default Card;

const Wrapper = styled.div`
  height: 200px;
  overflow: hidden;
  border-radius: 5%;
  transition: transform 0.3s, z-index 0.3s;
  position: relative;
  z-index: 1;
  margin: 0 !important;

  .title {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 1rem;
    color: white;
    background-color: #686666e0;
    text-align: center;
    width: 100%;

    /* padding: 0.5rem; */
  }
  span {
    font-size: 0.9rem;
  }
  p {
    margin: 0;
  }
  h4 {
    /* font-size: 0.5rem; */
    margin: 0;
  }
  .trailer {
    width: 100%;
    height: 100%;
  }
  .detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 1rem;
  }
  .icon {
    color: #c6c5c5c6;
    font-size: 1.7rem;
  }
  .icon:hover {
    color: white;
  }

  .card-img {
    width: 100%;
    border-radius: 5%;
  }

  .card-img img {
    border-radius: 5%;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-trailer {
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin: 0 !important;
  }
  .trailer {
    margin: 0 !important;
  }
  .card-info {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .more-info {
    z-index: 6 !important;
    transform: translateZ(0) !important;
  }
`;
