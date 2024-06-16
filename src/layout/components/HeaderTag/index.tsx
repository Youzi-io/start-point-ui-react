import MSIcon from "@/components/MSIcon";
import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import { Button, Flex } from "antd";

interface HeaderTagProps {
  className?: string;
}
const HeaderTag = ({ className }: HeaderTagProps) => {
  const list = [
    "仪表盘",
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8",
    "Option 9",
    "Option 10",
    "Option 11",
    "Option 12",
    "Option 13",
    "Option 14",
    "Option 15",
    "Option 16",
    "Option 17",
    "Option 18",
    "Option 19",
  ];

  const tagRef = useRef<HTMLDivElement>(null);
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (tagRef.current) {
      tagRef.current.scrollLeft += event.deltaY;
    }
  };

  const [tagIndex, setTagIndex] = useState(0);
  const tagItemRef = useRef<HTMLDivElement[]>([]);

  const [tagWidth, setTagWidth] = useState(0);
  const [tagLeftPosition, setTagLeftPosition] = useState(0);

  // 切换标签
  const handleChangeTag = (index: number) => {
    setTagIndex(index);
  };

  // 处理关闭标签
  const handleCloseTag = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    console.log(index);
  };

  const [tagMenu, setTagMenu] = useState(false);
  const [tagDropdownSite, setTagDropdownSite] = useState({
    x: 0,
    y: 0,
  });
  // 处理右键菜单
  const handleContextMenu = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log(event);
    setTagMenu(true);
    setTagDropdownSite({
      x: event.pageX,
      y: event.pageY,
    });
  };

  // 处理标签关闭下拉菜单
  const handleCloseTagDropdownMenu = () => {
    setTagMenu(false);
  };

  useEffect(() => {
    // 处理激活标签
    const handleActiveTag = () => {
      const currentTag = tagItemRef.current[tagIndex];
      if (currentTag) {
        setTagWidth(currentTag.offsetWidth);
        setTagLeftPosition(currentTag.offsetLeft);
        currentTag.scrollIntoView();
      }
    };
    handleActiveTag();
  }, [tagIndex]);

  return (
    <>
      <div
        className={`${className} relative mr-[15px] h-[100%] w-[100%] flex items-center overflow-hidden`}
        ref={tagRef}
        onWheel={handleScroll}
      >
        <div className={`flex justify-start items-center absolute`}>
          {list.map((item, index) => (
            <div
              className={`${styles["tag-list-item"]} p-[10px_16px] cursor-pointer select-none`}
              key={index}
              ref={(el) => (tagItemRef.current[index] = el!)}
              onClick={() => handleChangeTag(index)}
              onContextMenu={(event) => handleContextMenu(index, event)}
            >
              {item}
              <div
                className={`${styles["close-icon"]} flex items-center justify-center`}
                onClick={(event) => handleCloseTag(index, event)}
              >
                <MSIcon name="close" />
              </div>
            </div>
          ))}
          <div
            className={styles["tag-active-box"]}
            style={{
              width: tagWidth,
              left: tagLeftPosition,
            }}
          ></div>
        </div>
      </div>
      {tagMenu ? (
        <TagDropdownMenu
          x={tagDropdownSite.x}
          y={tagDropdownSite.y}
          close={handleCloseTagDropdownMenu}
        />
      ) : null}
    </>
  );
};

interface TagDropdownMenuProps {
  x?: number;
  y?: number;
  close?: () => void;
}

enum TagDropdownMenuOperationEnum {
  Refresh = "refresh",
  Close = "close",
  Other = "other",
  All = "all",
}

const TagDropdownMenu = ({ x, y, close }: TagDropdownMenuProps) => {
  const tagDropdownMenuRef = useRef<HTMLDivElement>(null);

  // 标签下拉菜单操作方法
  const tagDropdownMenuOperation = (type: TagDropdownMenuOperationEnum) => {
    switch (type) {
      case TagDropdownMenuOperationEnum.Refresh:
        tagRefresh();
        break;
      case TagDropdownMenuOperationEnum.Close:
        tagClose();
        break;
      case TagDropdownMenuOperationEnum.Other:
        tagCloseOther();
        break;
      case TagDropdownMenuOperationEnum.All:
        tagCloseAll();
        break;
    }
  };

  const tagRefresh = () => {};
  const tagClose = () => {};
  const tagCloseOther = () => {};
  const tagCloseAll = () => {};

  useEffect(() => {
    const focusTagMenu = (event: MouseEvent) => {
      const clickedElement = event.target as Node; // 获取被点击的元素
      if (tagDropdownMenuRef.current) {
        if (!tagDropdownMenuRef.current.contains(clickedElement)) {
          close && close();
        }
      }
    };
    document.addEventListener("click", focusTagMenu);
    return () => {
      document.removeEventListener("click", focusTagMenu);
    };
  }, [close]);

  return (
    <div
      className={`${styles["tag-dropdown-box"]} bg-[#fff] absolute left-0 top-0 z-10 overflow-hidden py-[10px]`}
      style={{
        left: x,
        top: y,
      }}
      ref={tagDropdownMenuRef}
    >
      <Flex vertical>
        <Button
          type="text"
          icon={<MSIcon name="Refresh" />}
          onClick={() =>
            tagDropdownMenuOperation(TagDropdownMenuOperationEnum.Refresh)
          }
        >
          重新加载
        </Button>
        <Button
          type="text"
          icon={<MSIcon name="Close" />}
          onClick={() =>
            tagDropdownMenuOperation(TagDropdownMenuOperationEnum.Close)
          }
        >
          关闭标签
        </Button>
        <Button
          type="text"
          icon={<MSIcon name="Remove" />}
          onClick={() =>
            tagDropdownMenuOperation(TagDropdownMenuOperationEnum.Other)
          }
        >
          关闭其他标签
        </Button>
        <Button
          type="text"
          icon={<MSIcon name="Crop_Square" />}
          onClick={() =>
            tagDropdownMenuOperation(TagDropdownMenuOperationEnum.All)
          }
        >
          关闭全部标签
        </Button>
      </Flex>
    </div>
  );
};

export default HeaderTag;
