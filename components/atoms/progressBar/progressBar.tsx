import React, { useEffect, useState } from "react";
import { BodyText } from "../typography/bodyText/BodyText";

interface ProgressBarProps {
  percent: number;
  text: string;
  triggerAnimation?: boolean; // Pour déclencher l'animation
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  text,
  triggerAnimation = true,
}) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const [displayedPercent, setDisplayedPercent] = useState(0);

  useEffect(() => {
    if (triggerAnimation) {
      const timeoutId = setTimeout(() => setAnimatedPercent(percent), 100);
      return () => clearTimeout(timeoutId);
    }
  }, [triggerAnimation, percent]);

  useEffect(() => {
    if (triggerAnimation) {
      let start = 0;
      const duration = 700;
      const step = percent / (duration / 16);

      const animate = () => {
        start += step;
        if (start < percent) {
          setDisplayedPercent(Math.floor(start));
          requestAnimationFrame(animate);
        } else {
          setDisplayedPercent(percent);
        }
      };

      animate();
    }
  }, [triggerAnimation, percent]);

  return (
    <div className="flex items-center w-full lg:my-2">
      <BodyText className="text-secondary w-[25%] lg:w-[40%] text-xs">
        {text}
      </BodyText>
      <div className="w-[50%] lg:w-[60%] bg-gray-800 rounded-full overflow-hidden mx-1">
        <div
          style={{ width: `${animatedPercent}%` }}
          className="h-1 bg-accent transition-all duration-700 ease-in-out"></div>
      </div>
      <span className="ml-1">{displayedPercent}%</span>
    </div>
  );
};

export default ProgressBar;
