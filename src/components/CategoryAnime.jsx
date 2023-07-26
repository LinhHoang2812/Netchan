import { styled } from "styled-components";
import AnimeSlider from "./AnimeSlider";
import { isMobile } from "detect-touch-device";
import AnimeSwiper from "./AnimeSwiper";
const CategoryAnime = ({ anime, category }) => {
  return (
    <Wrapper>
      <h4 className="category">{category}</h4>
      {isMobile ? (
        <AnimeSwiper listAnime={anime} />
      ) : (
        <AnimeSlider listAnime={anime} />
      )}
    </Wrapper>
  );
};
export default CategoryAnime;

const Wrapper = styled.div`
  margin-top: 3rem;

  .category {
    margin: 0;
    font-size: 1.5rem;
  }
  @media (max-width: 800px) {
    .category {
      font-size: 1rem;
    }
  }
`;
