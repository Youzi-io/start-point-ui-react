import {
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

const Error = lazy(() => import("@/pages/Error/index"));

const routes: IRouteObject[] = [
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        title: "仪表盘",
        Component: Dashboard,
      },
      // {
      //   path: "*",
      //   element: <Navigate to="/" replace={true} />,
      // },
    ],
  },
  {
    path: "/login",
    title: "登录",
    Component: Login,
  },
  {
    path: "*",
    Component: Error,
  },
];
const Router = () => {
  return <RouterProvider router={createBrowserRouter(routes)} />;
};
export default Router;
