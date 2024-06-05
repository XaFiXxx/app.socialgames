import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function GameCarousel({ games }) {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        slidesPerGroup={3}
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="mySwiper"
      >
        {games.map((game, index) => (
          <SwiperSlide key={index}>
            <Link to={`/game/${game.id}/${game.name}`} className="block">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${game.cover_image}`}
                  alt={game.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white">{game.name}</h3>
                  <p className="text-gray-300 truncate">{game.description}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <FaChevronLeft className="text-white bg-blue-500 rounded-full p-2 h-10 w-10 cursor-pointer hover:bg-blue-600 transition-colors duration-300" />
      </div>
      <div className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <FaChevronRight className="text-white bg-blue-500 rounded-full p-2 h-10 w-10 cursor-pointer hover:bg-blue-600 transition-colors duration-300" />
      </div>
    </div>
  );
}

export default GameCarousel;
