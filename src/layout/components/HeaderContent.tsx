import HeaderOperate from "./HeaderOperate";
import HeaderTag from "./HeaderTag";

const HeaderContent = () => {
  return (
    <div className="h-[100%] flex justify-between items-center">
      <HeaderTag className="flex-1" />
      <HeaderOperate />
    </div>
  );
};

export default HeaderContent;
