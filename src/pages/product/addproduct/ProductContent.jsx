import { useProductInfostore } from '@zustand/productInfo.mjs';

function ProductContent() {
  const { setProductInfo } = useProductInfostore();

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const content = formData.get('content');
    setProductInfo({ content: content });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">
          <p>여행 상세 정보를 입력해주세요</p>
          <p>예시 차량,숙박,제공등</p>
        </label>
        <textarea
          id="content"
          name="content" // name 속성 추가
          className="w-72 h-48 border-slate-950  bg-slate-200"
          placeholder="상세 정보를 입력해주세요"
        ></textarea>
        <button type="submit">다음</button>
      </form>
    </div>
  );
}

export default ProductContent;
