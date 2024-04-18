import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const PopularProductList = () => {
  const axios = useCustomAxios();
  const [popularProducts, setPopularProducts] = useState([]);
  const getPopularProducts = async () => {
    try {
      const response = await axios.get('/products');
      const filteredItems = response?.data?.item
        .filter(item => item.quantity > 0)
        .sort((a, b) => b.bookmarks - a.bookmarks)
        .slice(0, 5);

      setPopularProducts(filteredItems);
    } catch (error) {
      console.error('인기 상품 정보 불러오기 실패', error);
    }
  };

  useEffect(() => {
    getPopularProducts();
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: true,
        }}
        pagination={false}
        navigation={false}
        slidesPerView={1}
        loop={true}
        speed={900}
        effect="slide"
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {popularProducts.map(item => (
          <SwiperSlide key={item._id} className="h-[330px] border-b p-2">
            <div>
              <div className="w-102.5 h-56 overflow-hidden rounded-[10px]">
                <Link to={`/products/${item.id}`}>
                  <img
                    src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.mainImages[0]?.name}`}
                  />
                </Link>
              </div>

              <div className="p-2 relative">
                <Link to={`/products/${item.id}`}>
                  <h3 className="text-base font-medium">{item.name}</h3>
                </Link>
                <div className="flex text-sm">
                  <img
                    src="../src/assets/icons/icon-group.svg"
                    className="w-4 mr-1"
                  />
                  <p>{`${item.buyQuantity}/${item.quantity}`}</p>
                </div>

                <div className="mt-1">
                  {item.extra?.themes?.map(theme => (
                    <a
                      href="#"
                      className="bg-indigo-100 rounded mr-1 pb-0.5 px-0.5 text-sm font-medium"
                      key={theme.id}
                    >
                      # {theme.name}
                    </a>
                  ))}
                </div>

                <div className="absolute top-5 right-7 text-center">
                  <button type="button">
                    <img
                      src="../src/assets/icons/icon-heart-disabled.svg"
                      className="w-8"
                    />
                  </button>
                  <p className="-mt-2">{item?.bookmarks}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default PopularProductList;
