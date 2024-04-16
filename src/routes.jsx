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
import AddItinerary from '@pages/product/addproduct/AddItinerary';
import EditMyPage from '@pages/mypage/EditMyPage';
import Calendar from '@pages/product/addproduct/Calendar';
import ProductImage from '@pages/product/addproduct/ProductImage';
import ProductName from '@pages/product/addproduct/ProductName';
import ProductSelectSpot from '@pages/product/addproduct/ProductSelectSpot';
import SelectTheme from '@pages/product/addproduct/SelectTheme';
import ProductContent from '@pages/product/addproduct/ProductContent';
import ProductAddModal from '@pages/product/addproduct/ProductAddModal';
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
      {
        path: '/map',
        element: <AddItinerary />,
      },
    ],
  },
  {
    path: '/product/add',
    element: <AddProduct />,
    children: [
      {
        index: true,
        element: <ProductImage />,
      },
      {
        path: '/product/add/name',
        element: <ProductName />,
      },
      {
        path: '/product/add/calendar',
        element: <Calendar />,
      },
      {
        path: '/product/add/map',
        element: <AddItinerary />,
      },
      {
        path: '/product/add/spot',
        element: <ProductSelectSpot />,
      },
      {
        path: '/product/add/theme',
        element: <SelectTheme />,
      },
      {
        path: '/product/add/content',
        element: <ProductContent />,
      },
      {
        path: '/product/add/modal',
        element: <ProductAddModal />,
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
