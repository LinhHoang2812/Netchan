import Slider from "react-slick";
import Card from "./Card";
const AnimeSlider = ({ listAnime }) => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {listAnime.map((anime) => (
        <Card {...anime} key={anime.mal_id} />
      ))}
    </Slider>
  );
};
export default AnimeSlider;
