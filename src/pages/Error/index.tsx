import { getAssetsFile } from "@/utils/assetsUtils";
import { Button } from "antd";

const Error = () => {
  return (
    <div className="overflow-hidden">
      <NotFound />
    </div>
  );
};

const NotFound = () => {
  const notFoundImg = getAssetsFile("images/error/404.png");

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="w-[1200px] absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
      <div className="w-[600px]">
        <img className="w-[199%]" src={notFoundImg} alt="" />
      </div>
      <div className="w-[300px]">
        <div className="text-[#1677ff] font-bold text-[60px] my-[40px] leading-[1.1]">
          404错误!
        </div>
        <div className="text-[#222] font-bold text-[20px] mb-[10px] leading-[24px]">
          找不到页面!
        </div>
        <div className="text-[grey] text-[13px] mb-[30px] leading-[21px]">
          对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
        </div>
        <Button type="primary" shape="round" onClick={goBack}>
          返回首页
        </Button>
      </div>
    </div>
  );
};

export default Error;
