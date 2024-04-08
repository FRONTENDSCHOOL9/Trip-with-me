import usePageStore from "@zustand/pageName.mjs";


function Mypage() {
  const pageTitle = "마이페이지";
  const setPageName = usePageStore(state => state.setPageName); //setter만 가져다가 써야 함... 그래야 페이지 이름이 바뀌더라도 랜더링 안됨
  setPageName(pageTitle);


  return (
    <div>
      <p>마이페이지 내용</p>
    </div>
  )
}

export default Mypage;