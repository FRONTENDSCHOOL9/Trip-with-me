import { useProductInfostore } from '@zustand/productInfo.mjs';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ko from 'date-fns/locale/ko';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './productStyle/Calendar.css';

function Calendar() {
  // Zustand에서 상태와 상태 업데이트 함수 가져오기
  const { productInfo, setProductInfo } = useProductInfostore();

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  // 선택한 날짜 범위 상태 관리
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSubmit = event => {
    event.preventDefault();

    const formattedStartDate = selectedDateRange[0].startDate
      .toLocaleDateString('ko-KR')
      .replace(/\s/g, '');
    const formattedEndDate = selectedDateRange[0].endDate
      .toLocaleDateString('ko-KR')
      .replace(/\s/g, '');

    setProductInfo({
      extra: {
        ...productInfo.extra,
        date: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      },
    });
    navigate('/next');
  };

  const handlePrevious = () => {
    // 이전 버튼 클릭 시 이전 페이지로 이동
    navigate('/product/add');
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <p className="text-2xl font-notosans font-semibold text-main-color my-20">
          여행 날짜를 선택해주세요.
        </p>
        <DateRange
          locale={ko}
          editableDateInputs={true}
          onChange={ranges => setSelectedDateRange([ranges.selection])}
          moveRangeOnFirstSelection={false}
          ranges={selectedDateRange}
        />
        <div className="flex w-96 mt-28 justify-between items-center">
          <button
            type="button"
            className="bg-main-color px-10 py-3 rounded-full text-xl font-medium text-white"
            onClick={handlePrevious} // 이전 버튼 클릭 시 handlePrevious 함수 실행
          >
            이전
          </button>
          <p className="text-xl font-medium"> 3 / 7</p>
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
export default Calendar;
