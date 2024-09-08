import { GitmonType } from "../../types/global";
import "./TypeIcon.css";

interface TypeIconProps {
  type: GitmonType;
}

const TypeIcon = ({ type }: TypeIconProps) => {
  return (
    <div
      className="type-icon-container"
      style={{
        backgroundColor: type["color"],
      }}
    >
      {type["icon"]}
    </div>
  );
};

export default TypeIcon;
