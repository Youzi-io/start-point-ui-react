import { ConfigProvider } from "antd";

import { lazy, useState } from "react";
import { useLang } from "./hooks/useLang";

const BasicLayout = lazy(() => import("@/layout"));

const App: React.FC = () => {
  const { antdLang } = useLang();
  const defaultData = {
    colorPrimary: "#1677ff",
  };
  const [data] = useState(defaultData);
  return (
    <ConfigProvider locale={antdLang} theme={{ token: data }}>
      <BasicLayout />
    </ConfigProvider>
  );
};

export default App;
