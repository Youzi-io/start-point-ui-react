import { CSSProperties } from "react";

interface Props {
  name: string;
  className?: string;
  style?: CSSProperties;
}

const MSIcon = ({ name, className, style }: Props) => {
  style = {
    fontSize: 18,
    ...style,
  };
  return (
    <span
      className={`material-symbols-outlined m-s-icon ${className}`}
      style={style}
    >
      {name}
    </span>
  );
};

export default MSIcon;
