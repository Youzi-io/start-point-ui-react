import { ConfigProvider, Spin } from "antd";

import { lazy, useState } from "react";
import { useLang } from "./hooks/useLang";
import { useSpinStore } from "./stores";

const BasicLayout = lazy(() => import("@/layout"));

const App: React.FC = () => {
  const { antdLang } = useLang();
  const defaultData = {
    colorPrimary: "#1677ff",
  };
  const [data] = useState(defaultData);
  const { getSpan } = useSpinStore();

  return (
    <ConfigProvider locale={antdLang} theme={{ token: data }}>
      <Spin spinning={getSpan()}>
        <BasicLayout />
      </Spin>
    </ConfigProvider>
  );
};

export default App;
