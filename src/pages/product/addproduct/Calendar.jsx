import { useProductInfostore } from '@zustand/productInfo.mjs';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ko from 'date-fns/locale/ko';
import { useState } from 'react';

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
      <form onSubmit={handleSubmit}>
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
