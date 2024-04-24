import { Submit } from '@components/style/StyledButton';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import useMemberState from '@zustand/memberState.mjs';
import usePageStore from '@zustand/pageName.mjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function Payment() {
  const { _id } = useParams();
  const page = '예약 하기';
  const { user } = useMemberState();
  const setPageName = usePageStore(state => state.setPageName);
  const axios = useCustomAxios();
  const [productData, setProductData] = useState({});
  const [productCount, setProductCount] = useState(1);
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productImage, setProductImage] = useState({});
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const item = useLocation();

  console.log('item', item?.state?.item?.mainImages[0]?.name);
  const leftQuantity =
    +item?.state?.item.quantity - +item?.state?.item.buyQuantity;
  //
  useEffect(() => {
    if (user) {
      setPageName(page);
      setProductData(item?.state?.item);
      setProductImage(item?.state?.item?.mainImages[0]?.name);
      setProductPrice(item?.state?.item?.price);
      setProductQuantity(leftQuantity);
      // getProductData();
    } else if (!user) {
      alert('로그인 후 이용 가능합니다.');
      noUser();
    }
  }, []);

  function noUser() {
    navigate('/users/login');
  }

  // const getProductData = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${_id}`);
  //     console.log('data?.item', data?.item);
  //     setProductData(data?.item);
  //     setProductPrice(data?.item?.price);
  //     setProductImage(data?.item?.mainImages[0]);
  //     const leftQuantity = +data?.item.quantity - +data?.item.buyQuantity;
  //     setProductQuantity(leftQuantity);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const checkUpCount = () => {
    console.log(productQuantity);
    if (productCount >= productQuantity) {
      alert('모집 가능 인원을 초과하였습니다.');
      setProductCount(prevCount => prevCount - 1);
    }
  };
  const checkDownCount = () => {
    if (productCount <= 1) {
      alert('1명 이상만 예약 가능합니다.');
      setProductCount(prevCount => prevCount + 1);
    }
  };

  const handleUp = () => {
    checkUpCount();
    setProductCount(prevCount => prevCount + 1);
  };
  const handleDown = () => {
    checkDownCount();
    setProductCount(prevCount => prevCount - 1);
  };

  const onSubmit = async formData => {
    try {
      let product = {
        products: [
          {
            _id: +_id,
            quantity: productCount,
          },
        ],
      };
      let newData = {
        ...product,
        ...formData,
      };
      console.log('newData => ', newData);
      const res = await axios.post('/orders', newData);
      console.log('구매 return =>', res);
      alert('구매 완료하였습니다.');
      navigate(`/product/${_id}`);
    } catch (err) {
      //만약 구매 가능 개수를 넘어서 요청했다면
      if (err.response.status === 422) {
        alert('모집 가능 명수를 다시 확인해주세요.');
      }
    }
  };

  return (
    <>
      {user && (
        <div className="font-notosans h-full  bg-mainbg-color">
          <div className="flex flex-col gap-28 bg-mainbg-color">
            <div className="h-56 mx-auto mt-6 mb-6 border-2  bg-mainbg-color border-gray-300 shadow-xl rounded-2xl w-96 ">
              <img
                className="w-full h-full rounded-2xl"
                src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.state?.item?.mainImages[0]?.name}`}
              />
              <p className="my-4 text-2xl font-bold">{productData?.name}</p>
              <div className="flex gap-2">
                {productData?.extra?.themes.map(item => (
                  <span
                    className="px-3 py-1 text-sm font-medium border-2 rounded-full shadow-lg"
                    key={item.id}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
            <form className=" mx-auto w-96" onSubmit={handleSubmit(onSubmit)}>
              <p className="font-semibold text-lg mb-3">인원 선택</p>
              <div className="flex gap-10 h-10 bg-gray-200 items-center mx-auto justify-end pr-5 rounded-lg mb-12 shadow-lg">
                <p className="text-xs pl-5 text-gray-400">
                  <span>여행은 다른 문화, 다른 사람을 만나고 </span>
                  <span>결국에는 자기 자신을 만나는 것이다.</span>
                </p>
                <div className="flex justify-between w-[220px] font-semibold text-xl ">
                  <button type="button" onClick={handleDown}>
                    ▽
                  </button>
                  <p>{productCount}</p>
                  <button type="button" onClick={handleUp}>
                    △
                  </button>
                </div>
              </div>
              <div>
                <p className="font-semibold text-lg mb-3">기타 요청 사항</p>
                <textarea
                  className="h-28 bg-gray-200 w-full rounded-lg shadow-lg mb-10 resize-none" // 여기서 resize-none 추가
                  type="text"
                  id="request"
                  {...register('address.value')}
                />
              </div>
              <div className="mb-4">
                <Submit>{productCount * productPrice}원 결제하기</Submit>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Payment;
