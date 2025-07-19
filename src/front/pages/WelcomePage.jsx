import { useNavigate } from "react-router-dom";

export const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to my web!</h1>
      <img
        src="https://www.wemindcluster.com/wp-content/uploads/2016/01/welcome.jpg"
        alt="Welcome"
        className="w-50"
      />
      <h4>Thank you for visit us. Please, signup or login</h4>
      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
};
