import { useEffect, useRef, useState } from "react";
import UserCardFront from "../../components/UserCard/UserCardFront/UserCardFront";
import BlankCard from "../../components/UserCard/BlankCard/BlankCard";
import { User } from "../../types/global";
import "./HomePage.css";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import { getGithubUserData } from "../../utils/helpers";
import { useLocation, useNavigate } from "react-router-dom";

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
