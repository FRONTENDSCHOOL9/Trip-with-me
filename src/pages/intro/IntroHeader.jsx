import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트

IntroHeader.propTypes = {
  showSkipButton: PropTypes.bool,
};

function IntroHeader({ showSkipButton }) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSkip = () => {
    navigate('/users/login'); // 스킵 버튼 클릭 시 /users/login 페이지로 이동
  };

  return (
    <div>
      <div className="flex mt-6 mb-24 justify-between px-6">
        <div className="flex flex-col">
          <img
            className="-mb-2.5 ml-auto w-8 h-6"
            src="/src/assets/icons/icon-logo.svg"
            alt="메인 비행기 로고"
          />
          <h1 className="font-['SokchoBadaDotum'] font-bold text-xl text-center text-main-color">
            Trip with me
          </h1>
        </div>
        {showSkipButton && (
          <button className="-mb-3.5 font-semibold" onClick={handleSkip}>
            Skip
          </button>
        )}
      </div>
    </div>
  );
}

export default IntroHeader;
