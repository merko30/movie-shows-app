import React from 'react';

type InfoItemProps = {
  iconClass: string;
  label: string | number;
  // size?: FontAwesomeIconProps['size']
  // color?: FontAwesomeIconProps['color']
  labelColor?: string;
};

const InfoItem = ({ iconClass, label, labelColor = 'white' }: InfoItemProps) => {
  return (
    <span className="flex items-center text-white">
      <i className={iconClass} style={{ color: 'inherit' }} />
      <p style={{ color: labelColor }} className="ml-2">
        {label}
      </p>
    </span>
  );
};

export default InfoItem;
