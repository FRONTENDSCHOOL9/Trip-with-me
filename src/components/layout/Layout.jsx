
import { Outlet } from "react-router-dom";


function Layout() {
  return ( 
    <div className="relative mx-auto min-h-screen max-w-[375px] border border-gray-200 flex flex-col">
    
    <Outlet />
    
  </div>
  )
}

export default Layout