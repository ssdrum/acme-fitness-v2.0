import React, { useState, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { useHistory, Link } from "react-router-dom";
import { useEasybase } from "easybase-react";

const LogIn = () => {
  const { setShowMenu } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("12345678aB");

  const { signIn, isUserSignedIn } = useEasybase();
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn(username, password);
    if (res.success) {
      history.push("/");
      setShowMenu(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>

      <h4>Or Sign Up</h4>
      <Link to="/sign-up">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default LogIn;
