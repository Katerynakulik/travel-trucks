import React from "react";
import styles from "./Icon.module.css";

interface IconProps {
  id: string;
  width?: number;
  height?: number;
  className?: string;
  stroke?: string;
  fill?: string;
}

export const Icon: React.FC<IconProps> = ({
  id,
  width = 20,
  height = 20,
  className,
  stroke,
  fill,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={`${styles.icon} ${className || ""}`}
      aria-hidden="true"
      style={{ stroke, fill }}
    >
      <use xlinkHref={`/icons.svg#icon-${id}`} />
    </svg>
  );
};
