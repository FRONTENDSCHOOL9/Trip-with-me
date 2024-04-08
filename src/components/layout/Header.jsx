import usePageStore from '@zustand/pageName.mjs';
import { useEffect } from 'react';


function Header() {

  const {pageName} = usePageStore();
  console.log(pageName);

  useEffect(()=>{

  }, [pageName]);

  return (
    <div className="mb-auto">
      <h1>{pageName}</h1>
    </div>
  )
}

export default Header;
//zustand를 사용하는것보다는 props 를 사용하는게 좋다아~ 