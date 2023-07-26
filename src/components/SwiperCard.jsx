import { styled } from "styled-components";
import { Link } from "react-router-dom";
const SwiperCard = ({ title, images, mal_id }) => {
  return (
    <Wrapper className="netchan-touch-card">
      <Link to={`/anime/${mal_id}`} className="link">
        <div className="card-img">
          <img src={images.jpg.image_url} />
        </div>
      </Link>
      <h4 className="title">{title}</h4>
    </Wrapper>
  );
};
export default SwiperCard;

const Wrapper = styled.div`
  height: 200px;
  border-radius: 5%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  .link {
    width: 100%;
    height: 100%;
  }
  .title {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 0.9rem;
    color: white;
    background-color: #686666e0;
    text-align: center;
    width: 100%;
    margin: 0;
  }
  .card-img {
    width: 100%;
    height: 100%;
    border-radius: 5%;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 5%;
  }
`;
