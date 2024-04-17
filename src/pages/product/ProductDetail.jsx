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
        <ul className="flex my-4 gap-2">
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
      <div className="flex justify-around border-t-2 pt-6 font-medium">
        <button>상품 설명</button>
        <button>여행장 정보</button>
      </div>
      <div>
        <p className=" font-semibold text-lg">여행일정</p>
        <div>
          <ul className=" flex flex-col gap-2 text-xs bg-light-gray rounded-lg p-4">
            <li>fdf</li>
            <li>dfdf</li>
            <li>dfdf</li>
          </ul>
        </div>
      </div>
      {/* <div></div> 지도 API */}
      <div>
        <p className=" font-semibold text-lg">여행소개</p>
        <div className=" border-b-2 pb-10">
          <p className="text-sm">쏼ㄹ쏼라</p>
          <ul className=" flex flex-col gap-2 text-sm rounded-lg p-4">
            <li>fdf</li>
            <li>dfdf</li>
            <li>dfdf</li>
          </ul>
        </div>
      </div>
      <div>
        <p className=" font-semibold text-lg">댓글</p>
      </div>
    </div>
  );
}

export default ProductDetail;
