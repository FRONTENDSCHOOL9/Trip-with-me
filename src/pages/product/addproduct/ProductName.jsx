import { useProductInfostore } from '@zustand/productInfo.mjs';
import { useEffect, useState } from 'react';

function ProductName() {
  const { productInfo, setProductInfo } = useProductInfostore();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setProductInfo({
      ...productInfo,
      name: name,
      quantity: quantity,
      price: price,
    });
  }, [name, quantity, price, setProductInfo]);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(productInfo);
  };

  return (
    <div className="layout">
      <form>
        <div className="mb-4">
          <label
            className="my-20 font-semibold text-md font-notosans text-main-color"
            htmlFor="name"
          >
            제목을 입력하세요.
          </label>
          <input
            type="text"
            id="name"
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="my-20 font-semibold text-md font-notosans text-main-color"
            htmlFor="quantity"
          >
            최대 인원을 설정해주세요.
          </label>
          <input
            type="number"
            min="1"
            id="quantity"
            onChange={e => setQuantity(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="my-20 font-semibold text-md font-notosans text-main-color"
            htmlFor="price"
          >
            인당 경비를 입력해주세요.
          </label>
          <input
            type="number"
            min="0"
            onChange={e => setPrice(e.target.value)}
            id="price"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center justify-center mt-14">
          <button type="submit" onClick={handleSubmit}>
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductName;
