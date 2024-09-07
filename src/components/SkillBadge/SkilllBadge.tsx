import { Mapper } from "../../types/global";
import markdownBadges from "./markdown-badges.json";
import "./SkillBadge.css";

const markdownBadgesMapper = markdownBadges as Mapper<string>;

interface SkillBadgeProps {
  skill: string;
}
const SkillBadge = ({ skill }: SkillBadgeProps) => {
  let skillContent = <div className="skill-text">{skill}</div>;
  // Use markdown badge if available
  if (Object.keys(markdownBadges).includes(skill)) {
    skillContent = (
      <img className="skill-image" src={markdownBadgesMapper[skill]} />
    );
  }

  return (
    <div className="skill-badge">
      {skillContent}
      <div className="skill-overlay"></div>
    </div>
  );
};

export default SkillBadge;
