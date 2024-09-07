import { CgPokemon } from "react-icons/cg";
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaHackerrank,
  FaInstagram,
  FaLink,
  FaLinkedin,
} from "react-icons/fa";
import { Mapper } from "../types/global";

const IconMapping: Mapper<React.ReactElement> = {
  linkedin: <FaLinkedin />,
  github: <FaGithub />,
  hackerrank: <FaHackerrank />,
  instagram: <FaInstagram />,
  facebook: <FaFacebook />,
  discord: <FaDiscord />,
  pokemon: <CgPokemon />,
  link: <FaLink />,
};

export default IconMapping;
