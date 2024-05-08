import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

function GameCarousel({ games }) {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={3}
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      className="mySwiper w-full max-w-4xl mx-auto"
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
              <div className="mt-4 flex justify-end btn">
                <Link
                  to={`/game/${game.id}/${game.name}`}
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default GameCarousel;
