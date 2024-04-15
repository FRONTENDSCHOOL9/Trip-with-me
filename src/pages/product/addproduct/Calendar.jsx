import { useProductInfostore } from '@zustand/productInfo.mjs';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ko from 'date-fns/locale/ko';
import { useState } from 'react';

import './productStyle/Calendar.css';

function Calendar() {
  // Zustand에서 상태와 상태 업데이트 함수 가져오기
  const { setProductInfo } = useProductInfostore();

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
    setProductInfo({
      extra: selectedDateRange,
    });
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
        <button type="submit">다음</button>
      </form>
    </div>
  );
}
export default Calendar;
