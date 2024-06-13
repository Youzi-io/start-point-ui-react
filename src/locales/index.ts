import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

interface Module {
  [key: string]: Resource;
}

// 导入语言文件
const langModules: Record<string, Module> = import.meta.glob(
  "./lang/*/index.ts",
  { eager: true }
);

const langModuleMap = new Map<string, Module>();

const langKey: string = "start-point-lang";

// 生成语言模块列表
const generateLangModuleMap = () => {
  const fullPaths = Object.keys(langModules);
  fullPaths.forEach((fullPath: string) => {
    const k = fullPath.replace("./lang", "");
    const startIndex = 1;
    const lastIndex = k.lastIndexOf("/");
    const code = k.substring(startIndex, lastIndex);
    langModuleMap.set(code, langModules[fullPath]);
  });
};

// 导出 Resources
const exportResources = () => {
  generateLangModuleMap();
  const message: Resource = {};
  langModuleMap.forEach((value: Module, key) => {
    message[key] = value.default;
  });
  return message;
};

i18n.use(initReactI18next).init({
  debug: false,
  lng: localStorage.getItem(langKey) || "zh_CN",
  fallbackLng: "zh_CN",
  resources: exportResources(),
});

export default i18n;
