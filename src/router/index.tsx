import { RouteObject, useLocation, useRoutes } from "react-router-dom";
import { lazy, useEffect } from "react";
import AuthRouter from "./authRouter";
import nProgress from "nprogress";

type RouterAttr = {
  title?: string;
  name?: string;
  children?: IRouteObject[];
};
type IRouteObject = RouteObject & RouterAttr;

const BasicLayout = lazy(() => import("@/layout"));
const Login = lazy(() => import("@/pages/Login/index"));
const Dashboard = lazy(() => import("@/pages/Dashboard/index"));
const Error = lazy(() => import("@/pages/Error/index"));

const mainRouteName = "AppMain";

const routes: IRouteObject[] = [
  {
    path: "/",
    name: mainRouteName,
    element: (
      <AuthRouter>
        <BasicLayout />
      </AuthRouter>
    ),
    children: [
      {
        index: true,
        title: "仪表盘",
        name: "Dashboard",
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

nProgress.configure({
  showSpinner: false,
});

const Router = () => {
  const element = useRoutes(routes);
  const location = useLocation();

  nProgress.start();

  useEffect(() => {
    nProgress.done();
  }, [location]);

  return <>{element}</>;
};
export default Router;
