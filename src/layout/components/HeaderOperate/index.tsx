import MSIcon from "@/components/MSIcon";
import { useLang } from "@/hooks/useLang";
import { Avatar, Dropdown } from "antd";
import { useState } from "react";
import styles from "./index.module.scss";

const HeaderOperate = () => {
  const { getLangList, changeLanguage, getCurSysLang } = useLang();
  const [curLang] = useState(getCurSysLang());

  const [fullScreen, setFullScreen] = useState(false);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      // 进入全屏
      if (document.documentElement.requestFullscreen) {
        document.documentElement
          .requestFullscreen()
          .then(() => setFullScreen(true));
      }
    } else {
      // 退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setFullScreen(false));
      }
    }
  };

  return (
    <div
      className={`h-[46px] flex justify-center items-center select-none ${styles["option-list"]}`}
    >
      <Dropdown
        trigger={["click"]}
        menu={{
          items: getLangList(),
          selectable: true,
          defaultSelectedKeys: [curLang],
          onSelect: (item) => {
            changeLanguage(item.key);
          },
        }}
      >
        <div
          className={`h-[100%] px-[10px] flex justify-center items-center ${styles["option-list-item"]}`}
        >
          <MSIcon className={`${styles["option-icon"]}`} name="Translate" />
        </div>
      </Dropdown>
      <div
        className={`h-[100%] px-[10px] flex justify-center items-center ${styles["option-list-item"]}`}
        onClick={handleFullscreen}
      >
        {fullScreen ? (
          <MSIcon
            className={`${styles["option-icon"]}`}
            name={"Fullscreen_Exit"}
          />
        ) : (
          <MSIcon className={`${styles["option-icon"]}`} name="Fullscreen" />
        )}
      </div>
      <div
        className={`h-[100%] px-[10px] flex justify-center items-center ${styles["option-list-item"]}`}
      >
        <Avatar size="small">U</Avatar>
        <div className="ml-[5px]">Admin</div>
      </div>
    </div>
  );
};

export default HeaderOperate;
