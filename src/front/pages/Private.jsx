import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Private = () => {

  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const token = store.token || localStorage.getItem("token")

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(import.meta.env.VITE_BACKEND_URL + 'api/private', {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Invalid token or expired")
        return resp.json();
      })
      .then((data) => {
        setMessage(data.message)
        setUserId(data.user)
      })
      .catch(error => {
        dispatch({
          type: 'set_error',
          payload: error.message
        })
      })

  }, [store.token, navigate])

  return (
  <div className="d-flex flex-column justify-content-center align-items-center mt-5 container text-center">
    <h1 className="mb-4 text-primary">{message || "Loading..."}</h1>
    {userId && (
      <p>
        ID de usuario autenticado:{" "}
        <code className="bg-light p-2 rounded">{userId}</code>
      </p>
    )}
    {store.error && (
      <div className="alert alert-danger mt-3">
        {store.error}
      </div>
    )}
  </div>
);

};
