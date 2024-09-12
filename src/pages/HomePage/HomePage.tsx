import { useEffect, useRef, useState } from "react";
import UserCardFront from "../../components/UserCard/UserCardFront/UserCardFront";
import BlankCard from "../../components/UserCard/BlankCard/BlankCard";
import { User } from "../../types/global";
import "./HomePage.css";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import { getGithubUserData } from "../../utils/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import MetaTag from "../../components/MetaTag/MetaTag";
import { toPng } from "html-to-image";

const HomePage = () => {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [socialImage, setSocialImage] = useState<string>("");
  const userCardRef = useRef(null);
  const [userCardRendered, setUserCardRendered] = useState<boolean>(false);
  const usernameParam = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    if (usernameParam) {
      const loadUser = async () => {
        setIsLoading(true);
        try {
          const userData = await getGithubUserData(usernameParam);
          if (!userData) {
            alert("Enter a valid github username!");
            setIsLoading(false);
            navigate("/");
            return;
          }
          setUser(userData);
        } catch (error) {
          console.error(error);
          alert(`An error occurred while fetching user data. ${error}`);
        } finally {
          setIsLoading(false);
        }
      };
      loadUser();
    } else {
      setUser(null);
      setUsername("");
    }
  }, [usernameParam, navigate]);

  // I have no idea what I am doing, but this works
  // Please help please help please help
  useEffect(() => {
    if (userCardRef.current) {
      setUserCardRendered(true);
    }
  });

  useEffect(() => {
    const a = async () => {
      if (userCardRendered && userCardRef.current) {
        const canvasWidth = 1200;
        const canvasHeight = 630;
        const style = {
          transform: `scale(0.45, 1)`, // Scale element to fit canvas
        };
        const imageUrl = await toPng(userCardRef.current, {
          canvasHeight: canvasHeight,
          canvasWidth: canvasWidth,
          style: style,
        });
        setSocialImage(imageUrl);
      }
    };
    a();
  }, [userCardRendered, username]);

  async function buttonOnClick(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username === "") {
      return;
    }
    navigate(`/?query=${encodeURIComponent(username)}`);
  }

  return (
    <div id="home-page-container">
      <h1 id="title">Gitmon Card Generator</h1>
      {socialImage ? (
        <MetaTag
          title={username}
          imageUrl={socialImage}
          description="Card generated with gitmon card generator."
        />
      ) : (
        <></>
      )}

      <form onSubmit={buttonOnClick} id="generate-form">
        <label>Enter your github username here:</label>
        <div id="form-input">
          <input
            name="github-username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input type="submit" value="Generate" id="generate-button" />
        </div>
      </form>

      <LoadingOverlay isLoading={isLoading}>
        {user ? (
          <UserCardFront user={user} onClick={() => {}} ref={userCardRef} />
        ) : (
          <BlankCard />
        )}
      </LoadingOverlay>
    </div>
  );
};

export default HomePage;
