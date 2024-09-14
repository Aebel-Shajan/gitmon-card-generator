import "./UserCardFront.css";
import TypeIcon from "../../TypeIcon/TypeIcon";
import { getGitmonType } from "../../../utils/helpers.tsx";
import { Move, User } from "../../../types/global";
import SkillBadge from "../../SkillBadge/SkilllBadge.tsx";
import { forwardRef } from "react";

interface TypesComponentProps {
  types: string[];
}

const TypesComponent = ({ types }: TypesComponentProps) => {
  return (
    <div className="move-type-container">
      {types.map((type, index) => {
        return (
          <TypeIcon key={`move type${index}`} type={getGitmonType(type)} />
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
      <div className="move-score">{move["moveScore"]}</div>
    </div>
  );
};

interface UserCardFrontProps {
  user: User;
  onClick: () => void;
}

const UserCardFront = forwardRef<HTMLDivElement, UserCardFrontProps>(
  ({ user, onClick }, ref) => {
    const cardType = getGitmonType(user.type);
    const colorOverride = {
      "--type-color-transparent": cardType["color"] + "88",
    } as React.CSSProperties;
    return (
      <div className="card-container" style={colorOverride} ref={ref}>
        <div className="card-header-container">
          <div className="card-title">
            <div className="card-name">
              {user.name ? user.name : user.username}
            </div>
            <div className="card-id">{"# " + user.id}</div>
          </div>
          <div>{user.userScore}</div>
          <TypeIcon type={cardType} />
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
  },
);

export default UserCardFront;
