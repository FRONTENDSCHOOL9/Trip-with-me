import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from '@pages/users/Login';
import Signup from '@pages/users/Signup';
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
import SelectSpot from '@pages/product/addproduct/SelectSpot';
import SelectTheme from '@pages/product/addproduct/SelectTheme';
import ProductContent from '@pages/product/addproduct/ProductContent';
import ProductAddModal from '@pages/product/addproduct/ProductAddModal';
import MyPageOther from '@pages/mypage/MyPageOther';
import Intro from '@pages/intro/Intro';
import OtherProductSellList from '@pages/mypage/OtherProductSellList';
import KeywordSearchPage from '@pages/product/KeywordSearchPage';
import MainProductPage from '@pages/product/MainProductPage';
import FilterSearchPage from '@pages/product/FilterSearchPage';

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
        path: '/mypage/:_id/selllist',
        element: <OtherProductSellList />,
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
        path: '/product/add/:step',
        element: <ProductImage />,
      },
      {
        path: '/product/add/:step',
        element: <ProductName />,
      },
      {
        path: '/product/add/:step',
        element: <Calendar />,
      },
      {
        path: '/product/add/:step',
        element: <AddItinerary />,
      },
      {
        path: '/product/add/:step',
        element: <SelectSpot />,
      },
      {
        path: '/product/add/:step',
        element: <SelectTheme />,
      },
      {
        path: '/product/add/:step',
        element: <ProductContent />,
      },
      {
        path: '/product/add/:step',
        element: <ProductAddModal />,
      },
    ],
  },
  {
    path: '/product/list',
    element: <MainProductPage />,
  },
  {
    path: '/product/search',
    element: <DetailedSearch />,
  },
  {
    path: '/product/search/result',
    element: <FilterSearchPage />,
  },
  {
    path: '/users/login',
    element: <Login />,
  },
  {
    path: '/users/signup',
    element: <Signup />,
  },
  {
    index: true,
    element: <Intro />,
  },
  {
    path: '/trip-with-me/intro',
    element: <Intro />,
  },
  {
    path: '/search',
    element: <KeywordSearchPage />,
  },
]);

export default router;
