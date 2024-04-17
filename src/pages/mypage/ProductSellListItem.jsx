const productSellListItem = ({ item }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      {/* <img
        src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item.mainImages[0]?.name} alt=${item.mainImage.originalname}`}
      ></img> */}
    </div>
  );
};

export default productSellListItem;
