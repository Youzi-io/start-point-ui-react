import MSIcon from "@/components/MSIcon";
import { useLang } from "@/hooks/useLang";
import { Avatar, Button, Dropdown, Popover } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

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
      <Popover content={AdminPopover} trigger="click" placement="bottomRight">
        <div
          className={`h-[100%] px-[10px] flex justify-center items-center ${styles["option-list-item"]}`}
        >
          <Avatar size="small">U</Avatar>
          <div className="ml-[5px]">Admin</div>
        </div>
      </Popover>
    </div>
  );
};

const AdminPopover = () => {
  const [time, setTime] = useState<string>("");
  const navigate = useNavigate();

  const handleTime = () => {
    const date = dayjs(new Date().getTime());
    setTime(date.format("YYYY-MM-DD HH:mm:ss"));
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  useEffect(() => {
    handleTime();
    const timer = setInterval(() => {
      handleTime();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="text-center px-[20px]">
      <Avatar size={50}>U</Avatar>
      <div className="font-bold">Admin</div>
      <div className="mb-[15px]">{time}</div>
      <Button danger onClick={handleSignOut}>
        退出登录
      </Button>
    </div>
  );
};

export default HeaderOperate;
