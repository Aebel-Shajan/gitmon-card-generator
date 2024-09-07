import "./TypeIcon.css";

interface typeStyle {
  icon: React.ReactElement;
  color: string;
}

interface TypeIconProps {
  typeStyle: typeStyle;
}

const TypeIcon = ({ typeStyle }: TypeIconProps) => {
  return (
    <div
      className="type-icon-container"
      style={{
        backgroundColor: typeStyle["color"],
      }}
    >
      {typeStyle["icon"]}
    </div>
  );
};

export default TypeIcon;
