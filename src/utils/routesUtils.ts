import { IRouteObject } from "@/router/baseRouter";
import { RoutesInfoRes } from "@/types/system/routes";
import { lazy } from "react";

// 转换路由
export function transformRoutes(routes: RoutesInfoRes[]) {
  const temp: IRouteObject[] = [];
  routes.forEach((item) => {
    const { fullPath, routesName, componentPath } = item;
    const name = routesName || fullPath.replace(/\//, ""); // routesName为空时，取fullPath去除开头/
    const componentString = componentPath
      ? componentPath.replace(/^\/+/, "")
      : ""; // 过滤字符串前面所有 '/' 字符
    const componentUrl =
      "/src/" + componentString.replace(/\.\w+$/, "") + ".tsx";
    const modules = import.meta.glob("@/pages/**/*.tsx");

    if (modules[componentUrl]) {
      const obj: IRouteObject = {
        path: fullPath,
        name: name,
        Component: lazy(() => import(componentUrl)),
      };

      if (item.children) {
        const result = transformRoutes(item.children);
        obj.children = result;
      }

      temp.push(obj);
    } else {
      if (item.children) {
        const result = transformRoutes(item.children);
        temp.push(...result);
      }
    }
  });

  return temp;
}

// 获取第一个动态路由
export function getFirstDynamicRoutes(routes: RoutesInfoRes[]) {
  let firstRoutes: RoutesInfoRes | null = null;
  routes.find((item) => {
    const { isExternalLink, showStatus, children } = item;
    if (isExternalLink === "1" && showStatus === "0") {
      firstRoutes = item;
      return true;
    } else {
      if (children) {
        firstRoutes = getFirstDynamicRoutes(children);
      }
    }
  });
  return firstRoutes;
}
