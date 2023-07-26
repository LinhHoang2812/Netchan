import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCard from "./SwiperCard";

SwiperCore.use([EffectCoverflow, Pagination]);
const AnimeSwiper = ({ listAnime }) => {
  return (
    <Swiper
      centeredSlides={false}
      slidesPerView={2}
      breakpoints={{
        800: {
          width: 800,
          slidesPerView: 4,
        },
      }}
      className="mySwiper"
    >
      {listAnime.map((anime) => (
        <SwiperSlide>
          <SwiperCard {...anime} key={anime.mal_id} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default AnimeSwiper;
