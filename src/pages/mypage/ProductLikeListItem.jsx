import useCustomAxios from '@hooks/useCustomAxios.mjs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

ProductLikeListItem.propTypes = {
  item: PropTypes.object,
};

function ProductLikeListItem({ item }) {
  const axios = useCustomAxios();

  console.log('item=>', item);
  item?.product?.name;
  item?.product?.extra?.themes;

  const handleLike = async e => {
    try {
      const res = await axios.delete(`/bookmarks/${item?._id}`);
      console.log('item._id =>', item?._id);
      console.log('res =>', res);
      e.target.src = '/src/assets/icons/icon-heart-disabled.svg';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-2 px-5">
      <Link to={`/product/${item?.product?._id}`}>
        <img
          className="min-h-36 max-w-sm bg-gray-200 rounded-xl mb-1"
          src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.product?.image?.name}`}
        />
      </Link>
      <div className="flex gap-5">
        <Link to={`/product/${item?.product?._id}`}>
          <p className="mb-1">{item?.product?.name}</p>
        </Link>
        <img
          onClick={handleLike}
          className="w-6 h-6 ml-auto cursor-pointer"
          src="/src/assets/icons/icon-heart-full.svg"
          alt=""
        />
      </div>
      <div className="flex">
        {item?.product?.extra?.themes?.map(item => (
          <p
            className="p-0.5 mx-1 mb-2 border-2 bg-second-color rounded-md"
            key={item.id}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ProductLikeListItem;
