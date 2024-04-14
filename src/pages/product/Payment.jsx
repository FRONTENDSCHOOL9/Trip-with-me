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
  const [productQuantity, setProductQuentity] = useState(0);
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
      const { data } = await axios.get(`/products/${_id}`);
      setProductData(data);
      setProductPrice(data?.item?.price);
      setProductQuentity(data?.item?.buyQuantity);
    } catch (err) {
      console.log(err.message);
    }
  };

  const checkUpCount = () => {
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
        <div>
          <img
            src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${productData?.item?.mainImages?.name}`}
          />
          <p>이미지</p>
          <p>{productData?.item?.name}</p>
          <p>테마</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>인원 선택</p>
              <button type="button" onClick={handleUp}>
                △
              </button>
              <p>{productCount}</p>
              <button type="button" onClick={handleDown}>
                ▽
              </button>
            </div>
            <div>
              <p>기타 요청 사항</p>
              <input type="text" id="request" {...register('address.value')} />
            </div>
            <button type="submit">
              {productCount * productPrice}원 결제하기
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Payment;
