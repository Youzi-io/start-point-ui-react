import ReactDOM from "react-dom/client";

/**
 * 样式
 */
import "./styles/tailwind.css";
import "./styles/global.scss";
import "nprogress/nprogress.css";

/**
 * 工具
 */
import "./locales/index";

/**
 * 组件
 */
import App from "./app";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
