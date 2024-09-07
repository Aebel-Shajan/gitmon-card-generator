import {
  FaBrain,
  FaCloud,
  FaDatabase,
  FaInfinity,
  FaReact,
  FaRegDotCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { Mapper, TypeStyle } from "../types/global";

const TypeMapping: Mapper<TypeStyle> = {
  data: {
    icon: <FaDatabase />,
    color: "#ffff80", // light yellow
  },
  backend: {
    icon: <FaGear />,
    color: "#FF8C00", // dark orange
  },
  frontend: {
    icon: <FaReact />,
    color: "#61DAFB", // react blue
  },
  devops: {
    icon: <FaInfinity />,
    color: "#FF4500", // orange-red
  },
  cybersecurity: {
    icon: <FaShieldAlt />,
    color: "#32CD32", // lime green
  },
  cloud: {
    icon: <FaCloud />,
    color: "#1E90FF", // dodger blue
  },
  ai: {
    icon: <FaBrain />,
    color: "#FF1493", // deep pink
  },
  normal: {
    icon: <FaRegDotCircle />,
    color: "#d3d3d3", // light grey
  },
};

export default TypeMapping;
