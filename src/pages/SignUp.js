import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useEasybase } from "easybase-react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("12345678aB");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();
  const { signUp, signIn } = useEasybase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signUp(username, password);
    if (res.success) {
      await signIn(username, password);
      history.push("/welcome");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up!</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <h4>Or Log In</h4>
      <Link to="/login">
        <button>Log In</button>
      </Link>
    </div>
  );
};

export default SignUp;
