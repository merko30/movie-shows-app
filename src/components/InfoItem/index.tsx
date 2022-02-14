import React from 'react';

import styles from './info-item.module.css';

type InfoItemProps = {
  iconClass: string;
  label: string | number;
  // size?: FontAwesomeIconProps['size']
  // color?: FontAwesomeIconProps['color']
  labelColor?: string;
};

const InfoItem = ({ iconClass, label, labelColor = 'white' }: InfoItemProps) => {
  return (
    <span className={`${styles.container} flex itemsCenter`}>
      <i className={iconClass} style={{ color: 'inherit' }} />
      <p style={{ color: labelColor, marginLeft: '.5em' }}>{label}</p>
    </span>
  );
};

export default InfoItem;
