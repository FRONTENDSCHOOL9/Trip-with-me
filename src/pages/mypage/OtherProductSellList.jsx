import useCustomAxios from "@hooks/useCustomAxios.mjs";
// import OtherProductSellListItem from "@pages/mypage/OtherProductSellListItem";
import ProductSellListItem from "@pages/mypage/ProductSellListItem";
import usePageStore from "@zustand/pageName.mjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OtherProductSellList() {
  const page = "판매 목록"
  const setPageName = usePageStore(state => state.setPageName);
  const {_id} = useParams();
  const axios = useCustomAxios();
  const [pageParam, setPageParam] = useState(1);
  const [itemList, setItemList]= useState([]);
  const [totalPages, setTotalPages] = useState(0);


  const getSellList = async() => {
    try{
      const res = await axios.get('/products', {
        params : {
          seller_id : _id,
          page : pageParam,
          limit : 3,
        }
      })
      const list = res?.data?.item?.map((item)=>{
        return <ProductSellListItem key={item?._id} item={item} />
      })
      let newItemList = [...itemList, ...list];

      let endPage = res?.data?.pagination?.totalPages;
      let nowPage = res?.data?.pagination?.page;

      setItemList(newItemList);
      setTotalPages(endPage);
      setPageParam(nowPage+1);
    }
    catch(err){
      console.log(err.message);
    }
  }

  const handleClick = (e) => {
    if(pageParam < totalPages){
      getSellList();
    }else if(pageParam == totalPages){
      getSellList();
      e.target.className = 'hidden';
    }
  }

  console.log(_id);

  useEffect(()=>{
    getSellList()
    setPageName(page);
  }, [])

  return (
    <div className="mb-8 flex flex-col">
    {itemList}
      <button className='mx-auto border border-main-color rounded-lg text-sm text-white tracking-widest' onClick={handleClick}>
        <img className="w-8" src="/src/assets/icons/icon-more.svg" alt="" />
      </button>
    </div>
  )
}

export default OtherProductSellList;