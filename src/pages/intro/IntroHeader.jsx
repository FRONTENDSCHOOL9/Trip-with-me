import React from 'react';

function IntroHeader({ showSkipButton }) {
  return (
    <div>
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
        {showSkipButton && (
          <button className="-mb-3.5 font-semibold">Skip</button>
        )}
      </div>
    </div>
  );
}

export default IntroHeader;
