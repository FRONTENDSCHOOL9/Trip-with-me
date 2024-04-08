import Footer from "../../components/layout/Footer"
import Header from "../../components/layout/Header"


function Mypage() {
  const pageTitle = "마이페이지"
  
  return (
    <div>
      <Header pageTitle={pageTitle}/>
      <Footer />
    </div>
  )
}

export default Mypage``