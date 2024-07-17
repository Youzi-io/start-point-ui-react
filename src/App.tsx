import { ConfigProvider, Spin, ThemeConfig } from "antd";
import { Suspense, useState } from "react";
import { useLang } from "./hooks/useLang";
import { useSpinStore } from "./stores";
import { StyleProvider } from "@ant-design/cssinjs";
import Router from "./router";

const App: React.FC = () => {
  const { antdLang } = useLang();

  const defaultTheme: ThemeConfig = {
    token: {
      colorPrimary: "#1677ff",
    },
  };
  const [theme] = useState<ThemeConfig>(defaultTheme);

  const { getGlobalSpan, globalDelay, globalTip } = useSpinStore();

  return (
    <StyleProvider layer>
      <Suspense>
        <ConfigProvider locale={antdLang} theme={theme}>
          {/* 全局 Spin */}
          <Spin
            spinning={getGlobalSpan()}
            delay={globalDelay}
            tip={globalTip}
            fullscreen
          />
          <Router />
        </ConfigProvider>
      </Suspense>
    </StyleProvider>
  );
};

export default App;
