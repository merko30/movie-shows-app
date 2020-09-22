import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React from "react";

import styles from "./info-item.module.css";

interface InfoItemProps {
  icon: FontAwesomeIconProps["icon"];
  label: string | number;
  size?: FontAwesomeIconProps["size"];
  color?: FontAwesomeIconProps["color"];
  labelColor?: string;
}

const InfoItem = ({
  icon,
  label,
  color = "white",
  labelColor = "white",
  size = "1x",
}: InfoItemProps) => {
  return (
    <span className={`${styles.container} flex itemsCenter`}>
      <FontAwesomeIcon icon={icon} size={size} color={color} />
      <p style={{ color: labelColor, marginLeft: ".5em" }}>{label}</p>
    </span>
  );
};

export default InfoItem;
