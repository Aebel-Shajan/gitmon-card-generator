import IconMapping from "./IconMapping";
import TypeMapping from "./TypeMapping";
import { GitmonType, Mapper } from "../types/global";

export function preprocessString(string: string): string {
  return string
    .toLowerCase()
    .replace(" ", "")
    .replace("-", "")
    .replace("_", "");
}

export function calculateGitmonType(tags: string[]): GitmonType[] {
  // Preprocess all tags
  const normalizedTags = tags
    .filter((tag) => tag !== null)
    .map((tag) => preprocessString(tag));
  const typeScores: Mapper<number> = {};

  for (const [typeName, { keywords }] of Object.entries(TypeMapping)) {
    // Preprocess type keywords
    const normalizedKeywords = keywords.map((keyword) =>
      preprocessString(keyword),
    );
    // Find number of times each tags appear in types keyword list
    const matches = normalizedTags.filter((tag) =>
      normalizedKeywords.includes(tag),
    ).length;
    // Assign score to type
    typeScores[typeName] = matches;
  }

  // Find maximum score
  const maxMatches = Math.max(...Object.values(typeScores));
  if (maxMatches == 0) {
    return [getGitmonType("normal")];
  }

  // Obtain types which fit tags
  const bestTypes = Object.keys(typeScores).filter(
    (type) => typeScores[type] == maxMatches,
  );
  // Map to return full gitmon types
  return bestTypes.map((typeName) => getGitmonType(typeName));
}

export function getIconComponent(iconName: string): React.ReactElement {
  const IconComponent = IconMapping[preprocessString(iconName)];
  if (IconComponent) {
    return IconComponent;
  }
  return IconMapping["link"];
}

export function getGitmonType(typeName: string): GitmonType {
  const type = TypeMapping[preprocessString(typeName)];
  if (type) {
    return type;
  }
  return TypeMapping["normal"];
}
