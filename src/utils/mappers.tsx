import IconMapping from "./IconMapping";
import TypeMapping from "./TypeMapping";
import { TypeStyle } from "../types/global";

export function getIconComponent(iconName: string): React.ReactElement {
  const IconComponent = IconMapping[iconName.toLowerCase().replace(/ /g, "")];
  if (IconComponent) {
    return IconComponent;
  }
  return IconMapping["link"];
}

export function getTypeStyle(typeName: string): TypeStyle {
  const typeStyle = TypeMapping[typeName.toLowerCase().replace(/ /g, "")];
  if (typeStyle) {
    return typeStyle;
  }
  return TypeMapping["normal"];
}
