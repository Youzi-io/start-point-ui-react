import { Locale } from "antd/es/locale";
import { ResourceKey } from "i18next";
import { useTranslation } from "react-i18next";

interface LangResource {
  [key: string]: { [key: string]: string } | Locale;
}

interface LangList {
  content: ResourceKey;
  value: string;
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
  };

  // 获取语言列表
  const getLangList = (): LangList[] => {
    const langList: LangList[] = [];
    const langAllResource = i18n.services.resourceStore.data;
    Object.keys(langAllResource).forEach((key) => {
      langList.push({
        content: langAllResource[key].lang,
        value: key,
      });
    });
    return langList;
  };

  return { t, i18n, antdLang, changeLanguage, getLangList };
};
