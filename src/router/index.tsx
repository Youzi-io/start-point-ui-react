import {
  Navigate,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { lazy } from "react";

type RouterAttr = {
  title?: string;
  children?: IRouteObject[];
};
type IRouteObject = RouteObject & RouterAttr;

const App = lazy(() => import("@/App"));
const Login = lazy(() => import("@/pages/Login/index"));
const Dashboard = lazy(() => import("@/pages/Dashboard/index"));

const routes: IRouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        title: "仪表盘",
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace={true} />,
      },
    ],
  },
  {
    path: "/login",
    title: "登录",
    element: <Login />,
  },
];
const Router = () => {
  return <RouterProvider router={createBrowserRouter(routes)} />;
};
export default Router;
