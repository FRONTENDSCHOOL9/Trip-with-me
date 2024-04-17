// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import '@components/style/swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
// import 'swiper/css/bundle';

function Intro() {
  return (
    <div>
      <Swiper
        className="layout"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={440}
        slidesPerView={1}
        onSlideChange={() => console.log()}
        onSwiper={swiper => console.log(swiper)}
        navigation
        pagination={{
          dynamicBullets: true,
        }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide className="flex flex-col">
          <div className="flex flex-col justify-center ">
            <div className="flex mt-6 mb-24 justify-between px-6">
              <div className="flex flex-col">
                <img
                  className="-mb-1.5 ml-auto w-8 h-6"
                  src="/src/assets/icons/icon-logo.svg"
                  alt="메인 비행기 로고"
                />
                <h1 className="font-['SokchoBadaDotum'] font-bold text-xl text-center text-main-color">
                  Trip with me
                </h1>
              </div>
              <button className="-mb-4">Skip</button>
            </div>
            <img
              className="w-96 mb-16 mx-auto"
              src="/src/assets/image/earthIntro.png"
              alt=""
            />
            <h2 className="mx-auto text-2xl font-semibold mb-6 ">동행 찾기</h2>
            <div className=" text-center tracking-wider">
              <p>나의 여행 일정과 동행글을 등록</p>
              <p>전국 어디서나 최적의 동행을 찾으세요</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col">
          <div className="flex flex-col justify-center ">
            <div className="flex mt-6 mb-24 justify-between px-6">
              <div className="flex flex-col">
                <img
                  className="-mb-1.5 ml-auto w-8 h-6"
                  src="/src/assets/icons/icon-logo.svg"
                  alt="메인 비행기 로고"
                />
                <h1 className="font-['SokchoBadaDotum'] font-bold text-xl text-center text-main-color">
                  Trip with me
                </h1>
              </div>
              <button className="-mb-4">Skip</button>
            </div>
            <img
              className="w-96 mb-16 mx-auto"
              src="/src/assets/image/personIntro.png"
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
          <div className="flex flex-col justify-center ">
            <div className="flex mt-6 mb-24 justify-between px-6">
              <div className="flex flex-col">
                <img
                  className="-mb-1.5 ml-auto w-8 h-6"
                  src="/src/assets/icons/icon-logo.svg"
                  alt="메인 비행기 로고"
                />
                <h1 className="font-['SokchoBadaDotum'] font-bold text-xl text-center text-main-color">
                  Trip with me
                </h1>
              </div>
              <button className="-mb-4">Skip</button>
            </div>
            <img
              className="w-96 mb-16 mx-auto"
              src="/src/assets/image/peopleIntro.png"
              alt=""
            />
            <h2 className="mx-auto text-2xl font-semibold mb-6 ">동행 여행</h2>
            <div className=" text-center tracking-wider">
              <p>즐거운 추억을 만드세요</p>
              <p>동행 종료 후 평가를 남길 수 있어요</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Intro;
