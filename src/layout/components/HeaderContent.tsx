import MSIcon from "@/components/MSIcon";
import styles from "./headerContent.module.scss";
import { Dropdown } from "antd";
import { useLang } from "@/hooks/useLang";
import { useState } from "react";

const HeaderContent = () => {
  return (
    <div className="h-[100%] flex justify-between items-center">
      <div></div>
      <HeaderOperate />
    </div>
  );
};

const HeaderOperate = () => {
  const { getLangList, changeLanguage, getCurSysLang } = useLang();
  const [curLang] = useState(getCurSysLang());
  return (
    <div
      className={`h-[46px] flex justify-center items-center ${styles["option-list"]}`}
    >
      <Dropdown
        trigger={["click"]}
        menu={{
          items: getLangList(),
          selectable: true,
          defaultSelectedKeys: [curLang],
          onClick: (item) => {
            changeLanguage(item.key);
          },
        }}
      >
        <div
          className={`h-[100%] px-[20px] flex justify-center items-center ${styles["option-list-item"]}`}
        >
          <MSIcon className={`${styles["option-icon"]}`} name={"Translate"} />
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderContent;
