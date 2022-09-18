import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <form>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button type="submit">Login</button>
        <span>Wrong email or password!</span>
      </form>
    </div>
  );
};

export default Login;
