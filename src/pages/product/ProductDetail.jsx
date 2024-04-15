function ProductDetail() {
  return (
    <div className="flex flex-col ">
      <div className="w-96 h-56 rounded-lg  bg-light-gray mx-auto my-0">
        이미지
      </div>
      <div className="flex justify-between mx-3.5 mt-4 text-base font-semibold">
        <h2>속초 토박이가 추천하는 숨은 명소 투어</h2>
        <p>150,000 원</p>
      </div>
      <div>
        <ul className="flex">
          <li className="border-2  rounded-full py-1 px-4"># 먹방투어</li>
          <li className="border-2  rounded-full py-1 px-4"># 역사</li>
          <li className="border-2  rounded-full py-1 px-4"># 등등</li>
          <li className="border-2  rounded-full py-1 px-4"># 등등</li>
        </ul>
        <button type="button">
          <img src="" alt="" />
          <i className="ir">상품 수정 및 삭제</i>
        </button>
      </div>
      <div className="flex justify-around">
        <button>상품 설명</button>
        <button>여행장 정보</button>
      </div>
      <div>
        <p>여행일정</p>
        <div>
          <ul>
            <li>d</li>
            <li>d</li>
            <li>d</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
