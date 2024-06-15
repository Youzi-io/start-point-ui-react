import ReactDOM from "react-dom/client";
import Router from "./router/index";
import { Suspense } from "react";
import "./locales/index";
import { StyleProvider } from "@ant-design/cssinjs";
import "./styles/tailwind.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StyleProvider layer>
    <Suspense>
      <Router />
    </Suspense>
  </StyleProvider>
);
