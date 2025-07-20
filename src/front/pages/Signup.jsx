import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Signup = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()

	const[form, setForm] = useState({email: "", password: "" });

	const handleSubmit = (e) => {
		e.preventDefault();
		
		fetch(import.meta.env.VITE_BACKEND_URL + 'api/signup', { 
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
  <div className="d-flex justify-content-center align-items-center mt-5">
    <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
      <h2 className="mb-4 text-center text-primary">SIGN UP</h2>

      {store.error && (
        <div className="alert alert-danger text-center" role="alert">
          {store.error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  </div>
);

}; 