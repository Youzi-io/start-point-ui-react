import { useLocation, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import nProgress from "nprogress";
import baseRouter, { mainRouteName } from "./baseRouter";
import { useRoutesStore } from "@/stores";
import { transformRoutes } from "@/utils/routesUtils";

nProgress.configure({
  showSpinner: false,
});

const Router = () => {
  const { menuRouters, isAddRoutes, setIsAddRoutes } = useRoutesStore();
  const location = useLocation();

  nProgress.start();
  useEffect(() => {
    if (!isAddRoutes) {
      setIsAddRoutes(true);
      const index = baseRouter.findIndex((item) => item.name === mainRouteName);
      baseRouter[index].children = transformRoutes(menuRouters);
    }
    nProgress.done();
  }, [isAddRoutes, location, menuRouters, setIsAddRoutes]);

  const element = useRoutes(baseRouter);
  return <>{element}</>;
};
export default Router;
