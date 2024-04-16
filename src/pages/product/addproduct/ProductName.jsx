import { useProductInfostore } from '@zustand/productInfo.mjs';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // 수정된 부분

function ProductName() {
  const { productInfo, setProductInfo } = useProductInfostore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    setProductInfo({
      ...productInfo,
      name: data.name,
      quantity: data.quantity,
      price: data.price,
    });
    console.log(productInfo);
    navigate('/product/add/calendar');
  };

  const oninvalid = errors => console.error(errors);

  const navigate = useNavigate();
  const handlePrevious = () => {
    // 이전 버튼 클릭 시 이전 페이지로 이동
    navigate('/product/add');
  };

  console.log(productInfo);
  return (
    <div className="layout">
      <form onSubmit={handleSubmit(onSubmit, oninvalid)}>
        <div className="">
          <label
            className="my-20 font-semibold text-md font-notosans text-main-color"
            htmlFor="name"
          >
            제목을 입력하세요.
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            {...register('name', {
              required: '제목을 입력해주세요',
              minLength: {
                value: 2,
                message: '두 글자 이상 입력해주세요.',
              },
            })}
          />
          {errors.name && (
            <p className="text-sm font-medium text-warning-color font-notosans">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="">
          <label
            className="my-20 font-semibold text-md font-notosans text-main-color"
            htmlFor="quantity"
          >
            최대 인원을 설정해주세요.
          </label>
          <input
            type="text"
            id="quantity"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            {...register('quantity', {
              required: '최대 인원을 설정해주세요.',
              pattern: {
                value: /^[0-9]*$/,
                message: '숫자만 입력해주세요',
              },
            })}
          />
          {errors.quantity && (
            <p className="text-sm font-medium text-warning-color font-notosans">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div className="">
          <label
            className="my-20 font-semibold text-md font-notosans text-main-color"
            htmlFor="price"
          >
            인당 경비를 입력해주세요.
          </label>
          <input
            type="text"
            id="price"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            {...register('price', {
              required: '인당 경비를 입력해주세요.',
              pattern: {
                value: /^[0-9]*$/,
                message: '숫자만 입력해주세요',
              },
              minLength: {
                value: 4,
                message: '1,000원 이상 입력해주세요.',
              },
            })}
          />
          {errors.price && (
            <p className="text-sm font-medium text-warning-color font-notosans">
              {errors.price.message}
            </p>
          )}
        </div>
        <div className="flex w-96 mt-20 justify-between items-center">
          <button
            type="button"
            className="bg-main-color px-10 py-3 rounded-full text-xl font-medium text-white"
            onClick={handlePrevious} // 이전 버튼 클릭 시 handlePrevious 함수 실행
          >
            이전
          </button>
          <p className="text-xl font-medium"> 2 / 7</p>
          <button
            type="submit"
            className="bg-main-color px-10 py-3 rounded-full text-xl font-medium text-white"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductName;
