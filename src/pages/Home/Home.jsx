import "./Home.css";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const { dispatch } = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  onAuthStateChanged(auth, (currentUser) => {
    dispatch({ payload: currentUser });
  });

  return (
    <div className="home">
      <img src={currentUser?.photoURL} alt="" />
      <h1>{currentUser?.email}</h1>
      <button onClick={handleSignout}>Sign Out</button>
    </div>
  );
};

export default Home;
