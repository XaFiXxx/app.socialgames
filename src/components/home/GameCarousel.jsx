import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

function GameCarousel({ games }) {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="mySwiper"
      >
        {games.map((game, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden">
              <img
                src={`http://localhost:8000/${game.cover_image}`} // Vérifie l'exactitude du chemin
                alt={game.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-white">{game.name}</h3>
                <p className="text-gray-300 truncate">{game.description}</p>
                <div className="mt-4 text-center">
                  <Link
                    to={`/game/${game.id}/${game.name}`}
                    className="text-gray-200 hover:underline mt-2 block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 btn-blue text-white p-2 min-h-14 rounded-full z-11 hover:bg-gray-600"></div>
      <div className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 btn-blue text-white p-2 min-h-14 rounded-full z-11 hover:bg-gray-600"></div>
    </div>
  );
}

export default GameCarousel;
