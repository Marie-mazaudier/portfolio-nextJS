import React from "react";
import { Line } from "rc-progress";
import { BodyText } from "../typography/bodyText/BodyText";
interface ProgressBarProps {
  percent: number;
  text: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent, text }) => {
  return (
    <div className="flex flex-row items-center w-full">
      <BodyText className="text-secondary w-[40%]">{text}</BodyText>
      <div style={{ width: "60%", paddingLeft: "10px" }}>
        <Line
          percent={percent}
          strokeWidth={2}
          strokeColor="var(--accent-color)"
          trailWidth={2}
          trailColor="#191718"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
