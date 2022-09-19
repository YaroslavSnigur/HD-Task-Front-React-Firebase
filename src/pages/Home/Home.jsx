import "./Home.css";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [photoUrl, setPhotoUrl] = useState("");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          console.log(currentUser?.uid);
          console.log(doc.data().user);
          console.log(doc.data().url);
          if (doc.data().user === currentUser?.uid) {
            setPhotoUrl(doc.data().url);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  return (
    <div className="home">
      <img src={photoUrl} alt="" />
      <h1>{currentUser?.email}</h1>
      <button onClick={handleSignout}>Sign Out</button>
    </div>
  );
};

export default Home;
