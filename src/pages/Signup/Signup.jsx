import "./Signup.css";
import React, { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState(false);
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState(
    "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setFileUrl(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = { ...userCredential.user, photoURL: fileUrl };
        dispatch({ type: "SIGNUP", payload: user });
        addDoc(collection(db, "users"), {
          user: userCredential.user.uid,
          url: fileUrl,
        });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  return (
    <div className="sign-up">
      <div className="login-link">
        <Link className="login-link" to="/login">
          Log In
        </Link>
      </div>
      <div>Or</div>
      <h2>Create new user!</h2>
      <form onSubmit={handleSignUp}>
        <img src={fileUrl} alt="" />
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        {error && <span>Please use valid email and password!</span>}
      </form>
    </div>
  );
};

export default Signup;
