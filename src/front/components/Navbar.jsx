import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const navigate = useNavigate()
	const { store, dispatch } = useGlobalReducer()

	const logOut = () => {
		localStorage.removeItem("token");
      	localStorage.removeItem("user");
		dispatch({
			type: 'logout'
		})
		navigate("/login")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-between">
				{store.auth ? <button className="btn btn-primary" onClick={logOut}>Log out</button> : 
				<button className="btn btn-primary" onClick={() => navigate("/signup")}>Sign up</button>}
				{store.auth ? null : 
				<button className="btn btn-secondary" onClick={() => navigate("/login")}>Login</button>}
			</div>

		</nav>
	);
};