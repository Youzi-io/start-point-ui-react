import { useLang } from "@/hooks/useLang";
import { Button } from "antd";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { changeLanguage } = useLang();
  const switchLang = () => {
    changeLanguage("en_US");
  };

  return (
    <>
      <div>layout</div>
      <Button type="primary" onClick={switchLang}>
        切换语言
      </Button>
      <Outlet />
    </>
  );
};

export default Layout;
