// import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

ProductContent.propTypes = {
  productInfo: PropTypes.object,
  setProductInfo: PropTypes.func,
};

function ProductContent({ productInfo, setProductInfo }) {
  const navigate = useNavigate();
  const { step } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: productInfo?.content,
    },
  });

  const onSubmit = formData => {
    console.log(formData.content);
    navigate(`/product/add/${+step + 1}`);
    const newContent = { ...productInfo, content: formData.content };
    console.log('newContent=>', newContent);

    setProductInfo(newContent);

    navigate(`/product/add/${+step + 1}`);
  };

  const handlePrevButton = e => {
    e.preventDefault();
    navigate(`/product/add/${+step - 1}`);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col items-center justify-center"
      >
        <label htmlFor="content">
          <p className="mt-20 text-2xl font-semibold font-notosans text-main-color">
            여행 상세 정보를 입력해주세요
          </p>
          <p className="mt-4 mb-10 text-sm text-center font-notosans text-main-color">
            예시) 차량,숙박,제공등
          </p>
        </label>
        <textarea
          id="content"
          name="content"
          className="relative rounded-lg shadow-lg w-80 h-96 bg-light-gray"
          placeholder="상세 정보를 입력해주세요"
          {...register('content', {
            required: '상세 정보를 입력해주세요',
            minLength: {
              value: 10,
              message: '상세 정보는 10글자 이상 입력해주세요.',
            },
          })}
        ></textarea>
        {errors.content && (
          <p className="absolute text-sm font-medium text-warning-color bottom-24">
            {errors.content.message}
          </p>
        )}

        <div className="flex items-center justify-between mt-20 w-96">
          <button
            type="button"
            onClick={handlePrevButton}
            className="px-10 py-3 text-xl font-semibold text-white rounded-full bg-main-color"
          >
            이전
          </button>
          <p className="font-semibold text-m"> 7 / 7</p>
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

export default ProductContent;
