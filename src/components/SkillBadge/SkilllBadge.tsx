import { Mapper } from "../../types/global";
import markdownBadges from "./markdown-badges.json";
import "./SkillBadge.css";

const markdownBadgesMapper = markdownBadges as Mapper<string>;

function handleEdgeCases(skill: string): string {
  skill = skill.toLowerCase().replace(" ", "").replace("-", "");
  if (skill == "html") {
    return "html5";
  }
  if (skill == "css") {
    return "css3";
  }
  return skill;
}

interface SkillBadgeProps {
  skill: string;
}
const SkillBadge = ({ skill }: SkillBadgeProps) => {
  let skillContent = <div className="skill-text">{skill}</div>;
  const match = Object.keys(markdownBadges).filter((badge: string) => {
    const standardisedBadge = badge
      .toLowerCase()
      .replace(" ", "")
      .replace("-", "");
    const standardisedSkill = handleEdgeCases(skill);
    return standardisedBadge == standardisedSkill;
  });

  // Use markdown badge if available
  if (match.length > 0) {
    const badgePath = markdownBadgesMapper[match[0]];
    skillContent = <img className="skill-image" src={badgePath} alt={skill} />;
  }

  return (
    <div className="skill-badge">
      {skillContent}
      <div className="skill-overlay"></div>
    </div>
  );
};

export default SkillBadge;
