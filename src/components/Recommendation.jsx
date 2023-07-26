import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Recommendation = ({ images, title, mal_id }) => {
  return (
    <Wrapper>
      <Link to={`/anime/${mal_id}`}>
        <img src={images.jpg.image_url} />
        <h4>{title}</h4>
      </Link>
    </Wrapper>
  );
};
export default Recommendation;

const Wrapper = styled.article`
  border: 1px solid gray;
  background-color: #3e3e3e;
  a {
    text-decoration: none;
    color: #e6e5e5;
  }
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  h4 {
    text-align: center;
  }
`;
