import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Signup = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()

	const[form, setForm] = useState({email: "", password: "" });

	const handleSubmit = (e) => {
		e.preventDefault();
		
		fetch('https://automatic-chainsaw-v6wv5v496g6qcwqw5-3001.app.github.dev/api/signup', { 
			method: "POST",
      		headers: { "Content-Type": "application/json" },
      		body: JSON.stringify(form)
		})
		.then((resp)=>{
			if (!resp.ok) throw new Error("Signup failed")
			return resp.json()
		})
		.then((data)=>{
			alert(data.message);
			setForm({ email: "", password: "" });
			navigate("/private")
		})
		.catch(error => {
			dispatch({
				type: 'set_error',
				payload: error.message
			})
		})

	}


	return (
		<div className="text-center mt-5 container">
			<h1 className="mb-3">SIGN UP</h1>
			<form onSubmit={handleSubmit}>
				{store.error && <div className="alert alert-danger">{store.error}</div>}

				<div className="mb-3">
					<label htmlFor="inputEmail" className="form-label">Email address</label>
					<input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
				</div>
				<div className="mb-3">
					<label htmlFor="inputPassword" className="form-label">Password</label>
					<input type="password" className="form-control" id="inputPassword" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
}; 