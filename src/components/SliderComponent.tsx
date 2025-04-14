import { MovieType } from "@/types/MovieType"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/autoplay"
import Swipercore from "swiper"
import { Autoplay, FreeMode } from "swiper/modules"
import MovieCard from "./MovieCard"

interface SliderProps {
    data: MovieType[]
}

const SliderComponent = ({ data }: SliderProps) => {
    Swipercore.use([Autoplay, FreeMode])
  return (
    <div className="lg:px-20">
        <Swiper
            spaceBetween={16} 
            // slidesPerView={3} 
            autoplay={{
              delay: 2000, 
              disableOnInteraction: false, 
            }}
            loop={true} 
            freeMode={true} 
            allowTouchMove={true} 
            speed={3500} 
            className="flex items-center gap-5 h-46 sm:h-80" 
            breakpoints={{
              100: {
                slidesPerView: 2,
                centeredSlides: true, 
              },
              640: {
                slidesPerView: 3, 
                centeredSlides: true, 
              },
              1228: {
                slidesPerView: 5, 
                centeredSlides: true, 
              },
            }}
        >
            {data.map((item: MovieType) => (
                <SwiperSlide key={item.id} className="h-46 sm:h-80 text-white">
                    <MovieCard data={item}/>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default SliderComponent