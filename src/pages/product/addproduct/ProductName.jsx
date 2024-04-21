import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

ProductName.propTypes = {
  productInfo: PropTypes.object,
  setProductInfo: PropTypes.func,
};

function ProductName({ productInfo, setProductInfo }) {
  const navigate = useNavigate();
  const { step } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(watch('name'));

  const onSubmit = data => {
    setProductInfo({
      ...productInfo,
      name: data.name,
      quantity: data.quantity,
      price: data.price,
    });
    navigate(`/product/add/${+step + 1}`);
  };

  const handlePrevButton = e => {
    e.preventDefault();
    navigate(`/product/add/${+step - 1}`);
  };

  const oninvalid = errors => console.error(errors);

  console.log(productInfo);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, oninvalid)}>
        <div className="flex flex-col text-2xl font-semibold mx-6  ">
          <label className="mt-10 mb-6 text-main-color" htmlFor="name">
            여행 제목을 입력하세요.
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border-b-2 focus:outline-none focus:border-blue-500"
            {...register('name', {
              required: '제목을 입력해주세요',
              minLength: {
                value: 2,
                message: '두 글자 이상 입력해주세요.',
              },
            })}
          />
          {errors.name && (
            <p className=" text-sm font-medium text-warning-color font-notosans mt-2 ">
              {errors.name.message}
            </p>
          )}
          <label className="mt-10 mb-6 text-main-color " htmlFor="quantity">
            최대 인원을 설정해주세요.
          </label>
          <div className="flex">
            <input
              type="text"
              id="quantity"
              className="w-full px-3 py-2 border-b-2 focus:outline-none focus:border-blue-500"
              {...register('quantity', {
                required: '최대 인원을 설정해주세요.',
                pattern: {
                  value: /^[0-9]*$/,
                  message: '숫자만 입력해주세요',
                },
              })}
            />
            <span>명</span>
          </div>

          {errors.quantity && (
            <p className=" text-sm font-medium text-warning-color font-notosans  mt-2">
              {errors.quantity.message}
            </p>
          )}
          <label className="mt-10 mb-6 text-main-color" htmlFor="price">
            인당 경비를 입력해주세요.
          </label>
          <div className="flex">
            <input
              type="text"
              id="price"
              className="w-full px-3 py-2 border-b-2 focus:outline-none focus:border-blue-500"
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
            <span>원</span>
          </div>

          {errors.price && (
            <p className=" text-sm font-medium text-warning-color font-notosans  mt-2">
              {errors.price.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between mx-auto mt-10 w-96">
          <button
            type="button"
            onClick={handlePrevButton}
            className="px-10 py-3 text-xl  font-semibold text-white rounded-full bg-main-color"
          >
            이전
          </button>
          <p className="text-m font-semibold"> 2 / 7</p>
          <button
            type="submit"
            className="px-10 py-3 text-xl font-semibold text-white rounded-full bg-main-color"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductName;
