import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트

import '@components/style/swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import IntroHeader from './IntroHeader';

function Intro() {
  const [showSkipButton, setShowSkipButton] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const navigate = useNavigate();

  const handleSlideChange = () => {
    if (swiperInstance && !swiperInstance.isEnd) {
      setShowSkipButton(true);
    }
  };

  const handleDoneClick = () => {
    navigate('/users/login');
  };

  return (
    <div className="layout font-notosans">
      <div className="scrollbar">
        <IntroHeader showSkipButton={showSkipButton} />
        <Swiper
          className="swiper-layout"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={440}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          onSwiper={swiper => setSwiperInstance(swiper)}
          navigation
          pagination={{
            dynamicBullets: true,
          }}
          scrollbar={{ draggable: true }}
          onReachEnd={() => setShowSkipButton(false)}
        >
          <SwiperSlide className="flex flex-col">
            <div className="flex flex-col justify-center ">
              <img
                className="w-96 mb-16 mx-auto"
                src="/assets/image/earthIntro.png"
                alt=""
              />
              <h2 className="mx-auto text-2xl font-semibold mb-6 ">
                동행 찾기
              </h2>
              <div className=" text-center tracking-wider">
                <p>나의 여행 일정과 동행글을 등록</p>
                <p>전국 어디서나 최적의 동행을 찾으세요</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex flex-col">
            <div className="flex flex-col justify-center ">
              <img
                className="w-96 mb-16 mx-auto"
                src="/assets/image/personIntro.png"
                alt=""
              />
              <h2 className="mx-auto text-2xl font-semibold mb-6 ">
                동행 요청 및 여행 상품
              </h2>
              <div className=" text-center tracking-wider">
                <p>동행요청을 보내거나 수락하세요</p>
                <p>새로운 장소와 일정을 선택해서 상품을 만드세요</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex flex-col">
            <div className="flex flex-col justify-center">
              <img
                className="w-96 mb-16 mx-auto"
                src="/assets/image/peopleIntro.png"
                alt=""
              />
              <h2 className="mx-auto text-2xl font-semibold mb-6 ">
                동행 여행
              </h2>
              <div className=" text-center tracking-wider">
                <p>즐거운 추억을 만드세요</p>
                <p>동행 종료 후 평가를 남길 수 있어요</p>
              </div>
              <button
                className="mt-12 border text-lg font-semibold bg-main-color text-white  w-fit mx-auto px-20 py-1 rounded-full border-main-color "
                onClick={handleDoneClick}
              >
                Done
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Intro;
