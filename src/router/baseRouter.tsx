import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import AuthRouter from "./authRouter";

type RouterAttr = {
  title?: string;
  name?: string;
  children?: IRouteObject[];
};
export type IRouteObject = RouteObject & RouterAttr;

const BasicLayout = lazy(() => import("@/layout"));
const Login = lazy(() => import("@/pages/login/index"));
const Error = lazy(() => import("@/pages/error/index"));

export const mainRouteName = "AppMain";

const baseRouter: IRouteObject[] = [
  {
    path: "/",
    name: mainRouteName,
    element: (
      <AuthRouter>
        <BasicLayout />
      </AuthRouter>
    ),
    children: [],
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

export default baseRouter;
