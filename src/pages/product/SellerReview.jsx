import useCustomAxios from "@hooks/useCustomAxios.mjs"

function SellerReview({prop}) {
  const axios = useCustomAxios();
  const params = useParams();
  // {{url}}/products/9
  axios.get('/products/_id');

  return (
    <div>SellerReview</div>
    <p></p>
  )
}

export default SellerReview