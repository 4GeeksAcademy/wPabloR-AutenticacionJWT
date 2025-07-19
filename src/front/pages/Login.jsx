import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"; 

export const Login = () => {
  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()

  const[form, setForm] = useState({email: "", password: "" });

  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      fetch('https://automatic-chainsaw-v6wv5v496g6qcwqw5-3001.app.github.dev/api/login', { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
      })
      .then((resp)=>{
        if (!resp.ok) throw new Error("Login failed")
        return resp.json()
      })
      .then((data)=>{
        dispatch({
          type: 'login',
          payload: {
            user: data.user,
            token: data.token
          }
        })
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user))
        setForm({ email: "", password: "" });
        navigate("/private");
      })
      .catch(error => {
        dispatch({
          type: 'set_error',
          payload: error.message
        })
      })
  
    }

return (
  <div className="container d-flex justify-content-center align-items-center mt-5">
    <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
      <h2 className="text-center mb-4 text-primary">LOGIN</h2>

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
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  </div>
);

};
