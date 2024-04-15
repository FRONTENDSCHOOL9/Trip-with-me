import { Submit } from '@components/style/StyledButton';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import useMemberState from '@zustand/memberState.mjs';
import usePageStore from '@zustand/pageName.mjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

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
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setPageName(page);
      getProductData();
    } else if (!user) {
      alert('로그인 후 이용 가능합니다.');
      noUser();
    }
  }, []);

  function noUser() {
    navigate('/users/login');
  }

  const getProductData = async () => {
    try {
      const { data } = await axios.get('/products');
      const productItem = data?.item?.filter(item => {
        return item._id == _id;
      });
      console.log('productItem', productItem);
      setProductData(productItem[0]);
      setProductPrice(productItem[0]?.price);
      const leftQuantity =
        +productItem[0]?.quantity - +productItem[0]?.buyQuantity;
      setProductQuantity(leftQuantity);
    } catch (err) {
      console.log(err.message);
    }
  };

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
        <div className="p-2">
          <div className="h-24 bg-gray-200 rounded-md mb-2">
            <img
              src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${productData?.item?.mainImages?.name}`}
            />
          </div>

          <p className="mb-2">{productData?.name}</p>
          <p>
            {productData?.extra?.themes.map(item => (
              <p
                className="p-0.5 mx-1 mb-2 border-2 border-main-color rounded-md"
                key={item.id}
              >
                {item.name}
              </p>
            ))}
          </p>
          <hr className="border-0 bg-gray-100 h-2 my-10" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="font-bold">인원 선택</p>
            <div className="flex gap-20 h-10 bg-gray-200 items-center mx-auto justify-center rounded">
              <button type="button" onClick={handleDown}>
                ▽
              </button>
              <p>{productCount}</p>
              <button type="button" onClick={handleUp}>
                △
              </button>
            </div>
            <hr className="border-0 bg-gray-100 h-2 my-10" />
            <div>
              <p className="font-bold">기타 요청 사항</p>
              <input
                className="h-20 bg-gray-200 w-full rounded-md"
                type="text"
                id="request"
                {...register('address.value')}
              />
            </div>
            <hr className="border-0 bg-gray-100 h-2 my-10" />

            <Submit>{productCount * productPrice}원 결제하기</Submit>
          </form>
        </div>
      )}
    </>
  );
}

export default Payment;
