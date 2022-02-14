import React from 'react';

import styles from './info-item.module.css';

type InfoItemProps = {
  icon: React.ReactNode;
  label: string | number;
  // size?: FontAwesomeIconProps['size']
  // color?: FontAwesomeIconProps['color']
  labelColor?: string;
};

const InfoItem = ({ icon, label, labelColor = 'white' }: InfoItemProps) => {
  return (
    <span className={`${styles.container} flex itemsCenter`}>
      {icon}
      <p style={{ color: labelColor, marginLeft: '.5em' }}>{label}</p>
    </span>
  );
};

export default InfoItem;
