
import { createBrowserRouter } from "react-router-dom";
import Mypage from "@pages/users/Mypage";
import Layout from "./components/layout/Layout";





const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        path: "/users/mypage",
        element: <Mypage />,
      },
    ],
  },
]);

export default router;
