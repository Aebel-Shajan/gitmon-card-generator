import { useEffect, useRef, useState } from "react";
import UserCardFront from "../../components/UserCard/UserCardFront/UserCardFront";
import BlankCard from "../../components/UserCard/BlankCard/BlankCard";
import { User } from "../../types/global";
import "./HomePage.css";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import { getGithubUserData } from "../../utils/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { toBlob } from "html-to-image";
import {
  FaDiceFive,
  FaDiscord,
  FaDownload,
  FaGithub,
  FaHandsHelping,
  FaProjectDiagram,
  FaShare,
  FaStar,
} from "react-icons/fa";
import { PiSparkleBold } from "react-icons/pi";

const HomePage = () => {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const userCardRef = useRef(null);
  const usernameParam = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    if (usernameParam) {
      const loadUser = async () => {
        setIsLoading(true);
        try {
          const userData = await getGithubUserData(usernameParam);
          if (userData) {
            setUser(userData);
          } else {
            alert("Error getting user data.");
          }
        } catch (error) {
          if (!(error instanceof Error)) {
            alert(`undefined error: ${error}`);
            return;
          }
          alert(error.message);
        } finally {
          setIsLoading(false);
          setUsername(usernameParam);
        }
      };
      loadUser();
    } else {
      setUser(null);
      setUsername("");
    }
  }, [usernameParam, navigate]);

  async function buttonOnClick(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username === "") {
      return;
    }
    navigate(`/?query=${encodeURIComponent(username)}`);
  }

  async function handleDownload() {
    try {
      if (!userCardRef.current) {
        alert("User card not loaded.");
        return;
      }
      const newFile = await toBlob(userCardRef.current);
      if (!newFile) {
        alert("Error converting user card to image");
        return;
      }
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(newFile);
      downloadLink.download = `gitmon-${username}.png`;
      downloadLink.click();
    } catch (err) {
      alert(err);
    }
  }

  async function handleShare() {
    try {
      if (!userCardRef.current) {
        alert("User card not loaded.");
        return;
      }
      const newFile = await toBlob(userCardRef.current);
      if (!newFile) {
        alert("Error converting user card to image");
        return;
      }
      const data = {
        files: [
          new File([newFile], `gitmon-${username}.png`, {
            type: newFile.type,
          }),
        ],
        title: "Image",
        text: "image",
        url: "https://gitmon-card-generator.vercel.app/",
      };
      if (!navigator.canShare(data)) {
        alert("Can't share on your system :sad face emoji:");
      }
      await navigator.share(data);
    } catch (err) {
      alert(err);
    }
  }

  function handleRandomise() {
    const randomUsers = [
      "t3dotgg",
      "ThePrimeagen",
      "ChrisTitusTech",
      "octocat",
      "charmander",
      "github",
      "pjhyett",
      "defunkt",
      "mojombo",
      "torvalds",
      "wycats",
      "vanpelt ",
      "god",
      "dog",
    ];
    const randomUser =
      randomUsers[Math.floor(Math.random() * randomUsers.length)];
    navigate(`/?query=${encodeURIComponent(randomUser)}`);
  }

  return (
    <div id="home-page-container">
      <h1 id="title">Gitmon Card Generator</h1>

      <form onSubmit={buttonOnClick} id="generate-form">
        <label>Enter your github username here:</label>
        <div id="form-input-container">
          <input
            id="form-input"
            name="github-username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <button className="button" type="submit" id="generate-button">
            <PiSparkleBold />
            Generate
          </button>
        </div>
      </form>

      <div id="option-container" className="container">
        <button className="button" onClick={handleDownload}>
          <FaDownload />
          Download
        </button>
        <button className="button" onClick={handleShare}>
          <FaShare />
          Share
        </button>
        <button className="button" onClick={handleRandomise}>
          <FaDiceFive />
          Randomise
        </button>
        <a
          href="https://github.com/Aebel-Shajan/gitmon-card-generator"
          className="button"
          target="_blank"
        >
          <FaStar />
          Star Repo 🤩
        </a>
      </div>

      <LoadingOverlay isLoading={isLoading}>
        {user ? (
          <UserCardFront user={user} onClick={() => {}} ref={userCardRef} />
        ) : (
          <BlankCard />
        )}
      </LoadingOverlay>

      <footer>
        <a href="https://discord.gg/u3mktcZ8XR">
          <FaDiscord />
          Discord
        </a>
        <a href="https://github.com/aebel-shajan">
          <FaGithub />
          github
        </a>
        <a href="https://aebel-shajan.github.io#projects">
          <FaProjectDiagram />
          Check out my other projects
        </a>
        <a href="https://github.com/Aebel-Shajan/gitmon-card-generator">
          <FaHandsHelping />
          Contribute
        </a>
        <img
          id="visits-image"
          src="https://visit-counter.vercel.app/counter.png?page=https%3A%2F%2Fgitmon-card-generator.vercel.app%2F&s=40&c=ffffff&bg=00000000&no=6&tb=Visits%3A+&ta="
          alt="visits"
        ></img>
      </footer>
    </div>
  );
};

export default HomePage;
