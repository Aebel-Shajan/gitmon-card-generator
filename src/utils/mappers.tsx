import IconMapping from "./IconMapping";
import TypeMapping from "./TypeMapping";
import { GitmonType } from "../types/global";

export function getIconComponent(iconName: string): React.ReactElement {
  const IconComponent = IconMapping[iconName.toLowerCase().replace(/ /g, "")];
  if (IconComponent) {
    return IconComponent;
  }
  return IconMapping["link"];
}

export function getGitmonType(typeName: string): GitmonType {
  const type = TypeMapping[typeName.toLowerCase().replace(/ /g, "")];
  if (type) {
    return type;
  }
  return TypeMapping["normal"];
}
