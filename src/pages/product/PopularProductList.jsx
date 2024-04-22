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
  const [isLoading, setIsLoading] = useState(true);

  const getPopularProducts = async () => {
    try {
      const response = await axios.get('/products');
      const filteredItems = response?.data?.item
        .filter(item => item.quantity > 0)
        .sort((a, b) => b.bookmarks - a.bookmarks)
        .slice(0, 5);

      setPopularProducts(filteredItems);
      setIsLoading(false);
    } catch (error) {
      console.error('인기 상품 정보 불러오기 실패', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPopularProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-[6px]">
        <div className="card">
          <div className="spinner"></div>
        </div>
        <div className="cardDescription flex flex-col gap-3 justify-center">
          <span className="line line-1"></span>
          <span className="line line-1"></span>
          <span className="line line-2"></span>
        </div>
      </div>
    );
  }

  console.log('인기상품 정렬', popularProducts);

  return (
    <div className="h-[330px] border-b">
      {popularProducts.length > 0 && (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
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
            <SwiperSlide
              key={item._id}
              className="h-[330px]  p-2 font-notosans"
            >
              <div>
                <div className="w-102.5 h-56 overflow-hidden rounded-[10px]">
                  <Link to={`/product/${item._id}`}>
                    <img
                      className="size-full object-cover"
                      src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.mainImages[0]?.name}`}
                    />
                  </Link>
                </div>

                <div className="p-2 relative">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-base font-medium max-w-70 flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.name}
                    </h3>
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

                  <div className="absolute top-8 right-7 text-center">
                    <button type="button">
                      <img
                        src="../src/assets/icons/icon-heart-disabled.svg"
                        className="w-8"
                      />
                    </button>
                    {/* <p className="-mt-2">{item?.bookmarks}</p> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default PopularProductList;
