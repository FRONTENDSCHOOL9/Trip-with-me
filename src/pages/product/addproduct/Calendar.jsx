import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ko from 'date-fns/locale/ko';
import { useState } from 'react';
import PropTypes from 'prop-types';

import './productStyle/Calendar.css';
import { useNavigate, useParams } from 'react-router-dom';

Calendar.propTypes = {
  productInfo: PropTypes.object,
  setProductInfo: PropTypes.func,
};

function Calendar({ productInfo, setProductInfo }) {
  const navigate = useNavigate();
  const { step } = useParams();

  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

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
    navigate(`/product/add/${+step + 1}`);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const handlePrevButton = e => {
    e.preventDefault();
    navigate(`/product/add/${+step - 1}`);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <p className="my-12 text-2xl font-semibold  text-main-color">
          여행 날짜를 선택해주세요.
        </p>
        <DateRange
          locale={ko}
          editableDateInputs={true}
          onChange={ranges => setSelectedDateRange([ranges.selection])}
          moveRangeOnFirstSelection={false}
          ranges={selectedDateRange}
        />
        <div className="flex items-center justify-between mt-20 mb-12 w-96">
          <button
            type="button"
            onClick={handlePrevButton}
            className="px-10 py-3 text-xl font-medium text-white rounded-full bg-main-color"
          >
            이전
          </button>
          <p className="text-m font-semibold"> 3 / 7</p>
          <button
            type="submit"
            onClick={handleCalendarChange}
            className="px-10 py-3 text-xl font-semibold text-white rounded-full bg-main-color"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
}
export default Calendar;
