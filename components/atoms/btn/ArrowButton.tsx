import React from 'react';
import Arrow from '@/assets/icons/arrow-down-right.svg';

interface CallToActionProps {
  themeColors?: {
    data: {
      primary: string;
    };
  };
}

const ArrowButton: React.FC<CallToActionProps> = ({ themeColors }) => {
  return (
    <div 
      className="box-border relative shrink-0 mt-10 mr-auto h-auto text-sm text-blue-800 uppercase"
      style={{ color: themeColors?.data.primary }}
    >
<p className="inline-flex items-center">
Découvrir mes projets 
        <Arrow
                width="23px"
                height="23px"
                className="text-primary m-auto ml-2 " // Applique la couleur primary au SVG entier via currentColor
                strokeWidth="1.5" 
              />
      </p>
    </div>
  );
};

export default ArrowButton;