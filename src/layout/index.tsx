import { Layout, theme } from "antd";
import { useState } from "react";
import SiderContent from "./components/SiderContent";
import HeaderContent from "./components/HeaderContent";
import "./index.module.scss";

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
        className="mix-h-[calc(100vh-20px-48px)] overflow-y-auto ml-[10px] my-[10px] rounded-[5px] shadow-[0_0_12px_rgba(0,0,0,0.12)]"
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
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
