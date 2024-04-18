import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ko from 'date-fns/locale/ko';
import { useState } from 'react';

import './productStyle/Calendar.css';
import { useNavigate, useParams } from 'react-router-dom';

function Calendar({ productInfo, setProductInfo }) {
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const navigate = useNavigate();
  const { step } = useParams();

  const handleCalendarChange = e => {
    e.preventDefault();
    const formattedStartDate = selectedDateRange[0].startDate
      .toLocaleDateString('ko-KR')
      .replace(/\s/g, '');
    const formattedEndDate = selectedDateRange[0].endDate
      .toLocaleDateString('ko-KR')
      .replace(/\s/g, '');
    if (selectedDateRange) {
      navigate(`/product/add/${+step + 1}`);
      setProductInfo({
        ...productInfo,
        extra: {
          ...productInfo.extra,
          date: {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          },
        },
      });
    } else {
      setShowUploadPrompt(true);
    }
  };

  const handlePrevButton = e => {
    navigate(`/product/add/${+step - 1}`);
  };

  const handleSubmit = event => {
    event.preventDefault();
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
        <div className="flex w-96 mt-20 justify-between items-center">
          <button
            type="button"
            onClick={handlePrevButton}
            className="bg-main-color px-10 py-3 rounded-full text-xl font-medium text-white"
          >
            이전
          </button>
          <p className="text-xl font-medium"> 3 / 7</p>
          <button
            type="submit"
            onClick={handleCalendarChange}
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
