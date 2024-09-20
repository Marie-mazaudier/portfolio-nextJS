import React from 'react';

interface FooterItemProps {
  text: string;
}

const FooterItem: React.FC<FooterItemProps> = ({ text }) => (
  <div className="box-border  relative shrink-0 my-auto h-auto uppercase font-regular text-primary">
    <p>{text}</p>
  </div>
);

export default FooterItem;