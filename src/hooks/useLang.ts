import { langKey } from "@/locales";
import { Locale } from "antd/es/locale";
import { useTranslation } from "react-i18next";

interface LangResource {
  [key: string]: { [key: string]: string } | Locale;
}

interface LangList {
  key: string;
  label: string;
}

export const useLang = () => {
  const [t, i18n] = useTranslation();
  // 当前语言包资源
  const currentLangResource: LangResource = i18n.getDataByLanguage(
    i18n.resolvedLanguage!
  )!;

  // antd 语言包
  const antdLang: Locale = currentLangResource.antdLang as Locale;

  // 切换语言
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem(langKey, lng);
  };

  // 获取语言列表
  const getLangList = (): LangList[] => {
    const langList: LangList[] = [];
    const langAllResource = i18n.services.resourceStore.data;
    Object.keys(langAllResource).forEach((key) => {
      langList.push({
        label: langAllResource[key].lang as string,
        key: key,
      });
    });
    return langList;
  };

  // 获取当前系统记录的语言
  const getCurSysLang = () => {
    return localStorage.getItem(langKey) || "zh_CN";
  };

  return { t, i18n, antdLang, changeLanguage, getLangList, getCurSysLang };
};
