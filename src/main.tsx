import ReactDOM from "react-dom/client";
import Router from "./router/index";
import "./reset.css";
import "./index.css";
import "./locales/index";
import { Suspense } from "react";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <Suspense>
    <Router />
  </Suspense>
);
