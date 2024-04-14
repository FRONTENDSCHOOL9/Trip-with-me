import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from '@pages/users/Login';
import Signup from '@pages/users/Signup';
import MainProductList from '@pages/product/MainProductList';
import DetailedSearch from '@pages/product/DetailedSearch';
import ProductDetail from '@pages/product/ProductDetail';
import MyPage from '@pages/mypage/MyPage';
import Payment from '@pages/product/Payment';
import ProductBuyList from '@pages/mypage/ProductBuyList';
import ProductSellList from '@pages/mypage/ProductSellList';
import ProductLikeList from '@pages/mypage/ProductLikeList';
import AddProduct from '@pages/product/AddProduct';
import EditMyPage from '@pages/mypage/EditMyPage';
import MyPageOther from '@pages/mypage/MyPageOther';

const router = createBrowserRouter([
  {
    path: '/',
    // errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        path: '/product/:_id',
        element: <ProductDetail />,
      },
      {
        path: '/product/:_id/payment',
        element: <Payment />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
      },
      {
        path: '/mypage/:_id',
        element: <MyPageOther />,
      },
      {
        path: '/mypage/edit',
        element: <EditMyPage />,
      },
      {
        path: '/mypage/buylist',
        element: <ProductBuyList />,
      },
      {
        path: '/mypage/selllist',
        element: <ProductSellList />,
      },
      {
        path: '/mypage/likelist',
        element: <ProductLikeList />,
      },
    ],
  },
  {
    path: '/product/list',
    element: <MainProductList />,
  },
  {
    path: '/product/search',
    element: <DetailedSearch />,
  },
  {
    path: '/product/add',
    element: <AddProduct />,
  },
  {
    index: true,
    element: <Login />,
  },
  {
    path: '/users/login',
    element: <Login />,
  },
  {
    path: '/users/signup',
    element: <Signup />,
  },
]);

export default router;
