import "./UserCardFront.css";
import TypeIcon from "../../TypeIcon/TypeIcon";
import { getTypeStyle } from "../../../utils/mappers.tsx";
import { Move, User } from "../../../types/global";
import SkillBadge from "../../SkillBadge/SkilllBadge.tsx";

interface TypesComponentProps {
  types: string[];
}

const TypesComponent = ({ types }: TypesComponentProps) => {
  return (
    <div className="move-type-container">
      {types.map((type, index) => {
        return (
          <TypeIcon key={`move type${index}`} typeStyle={getTypeStyle(type)} />
        );
      })}
    </div>
  );
};

interface MoveComponentProps {
  move: Move;
}

const MoveComponent = ({ move }: MoveComponentProps) => {
  return (
    <div className="move-container">
      <TypesComponent types={move["types"]} />
      <div className="move-name">{move["name"]}</div>
    </div>
  );
};

interface UserCardFrontProps {
  user: User;
  onClick: () => void;
}

const UserCardFront = ({ user, onClick }: UserCardFrontProps) => {
  const cardTypeStyle = getTypeStyle(user.type);
  const colorOverride = {
    "--type-color-transparent": cardTypeStyle["color"] + "88",
  } as React.CSSProperties;
  return (
    <div className="card-container" style={colorOverride}>
      <div className="card-header-container">
        <div className="card-title">
          <div className="card-name">
            {user.name ? user.name : user.username}
          </div>
          <div className="card-id">{"# " + user.id}</div>
        </div>
        <TypeIcon typeStyle={cardTypeStyle} />
      </div>
      <div className="card-image-container" onClick={onClick}>
        <img className="card-image" src={user.image} />
      </div>
      <div className="card-occupation-container">
        <div className="card-occupation">{user.occupation}</div>
      </div>
      <div className="card-description-container">
        {user.description.substring(0, 1000)}
      </div>
      <div className="card-moves-container">
        {user.moves.map((move, index) => {
          return <MoveComponent key={`index${index}`} move={move} />;
        })}
      </div>
      <div className="card-skills-container">
        {user.skills.map((skill, index) => {
          return <SkillBadge skill={skill} key={index} />;
        })}
      </div>
    </div>
  );
};

export default UserCardFront;
