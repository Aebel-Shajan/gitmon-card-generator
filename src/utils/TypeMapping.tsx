import {
  FaDatabase,
  FaGamepad,
  FaInfinity,
  FaMicrochip,
  FaMobileAlt,
  FaReact,
  FaRegDotCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { GitmonType, Mapper } from "../types/global";
import tags from "./githubTags.json";

const TypeMapping: Mapper<GitmonType> = {
  frontend: {
    name: "frontend",
    icon: <FaReact />,
    color: "#00D8FF", // Lighter React blue for modern front-end,
    keywords: tags["frontend"],
  },
  backend: {
    name: "backend",
    icon: <FaGear />,
    color: "#FF6347", // Tomato, gives a strong backend feel
    keywords: tags["backend"],
  },
  mobile: {
    name: "mobile",
    icon: <FaMobileAlt />,
    color: "#FF69B4", // Hot pink, fresh and innovative for mobile
    keywords: tags["mobile"],
  },
  devops: {
    name: "devops",
    icon: <FaInfinity />,
    color: "#48D1CC", // Medium turquoise, signifying constant flow and automation
    keywords: tags["devops"],
  },
  data: {
    name: "data",
    icon: <FaDatabase />,
    color: "#FFD700", // Gold, representing the value of data
    keywords: tags["data"],
  },
  cybersecurity: {
    name: "cybersecurity",
    icon: <FaShieldAlt />,
    color: "#228B22", // Forest green, symbolizing security and robustness
    keywords: tags["cybersecurity"],
  },
  gamedev: {
    name: "gamedev",
    icon: <FaGamepad />,
    color: "#FF4500", // Orange-red, energetic and creative for game dev
    keywords: tags["gamedev"],
  },
  systems: {
    name: "systems",
    icon: <FaMicrochip />,
    color: "#696969", // Dim gray, representing low-level and hardware close systems
    keywords: tags["systems"],
  },
  normal: {
    name: "normal",
    icon: <FaRegDotCircle />,
    color: "#C0C0C0", // Silver, neutral and generic for uncategorized types
    keywords: ["life"],
  },
};

export default TypeMapping;
