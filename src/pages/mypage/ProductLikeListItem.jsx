import PropTypes from 'prop-types';

ProductLikeListItem.propTypes = {
  item: PropTypes.object,
};

function ProductLikeListItem({ item }) {
  console.log('item=>', item);
  item?.product?.name;
  item?.product?.extra?.themes;

  return (
    <div className="p-2">
      <img
        className="min-h-36 bg-gray-200 rounded-xl mb-1"
        src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.product?.image?.name}`}
      />
      <p className="mb-1">{item?.product?.name}</p>
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
      <img src="/src/assets/icons/icon-heartfull.svg" alt="" />
    </div>
  );
}

export default ProductLikeListItem;
