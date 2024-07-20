import { Layout, theme } from "antd";
import { useState } from "react";
import SiderContent from "./components/SiderContent";
import HeaderContent from "./components/HeaderContent";
import styles from "./index.module.scss";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const BasicLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="min-h-screen max-h-screen overflow-hidden">
      <Sider
        className={`mix-h-[calc(100vh-20px-48px)] overflow-y-auto m-[10px_0_10px_10px] ${styles["sider"]}`}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        theme="light"
      >
        <SiderContent />
      </Sider>
      <Layout>
        <Header className="px-[10px] pt-[10px] leading-none box-border bg-transparent">
          <HeaderContent />
        </Header>
        <Content
          className="my-6 mx-4"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
