import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Private = () => {

  const { store } = useGlobalReducer()
  const navigate = useNavigate()

  useEffect(()=>{ 
    const token = store.token || localStorage.getItem("token")

    if (!token){
      navigate("/login");
    }
  }, [store.token, navigate])

return (
  <div className="d-flex flex-column justify-content-center align-items-center mt-5 container text-center">
    <h1 className="mb-4 text-primary">Bienvenido a la zona privada 🚀</h1>
    <p>
      Tu token es:{" "}
      <code className="bg-light p-2 rounded">
        {store.token || localStorage.getItem("token")}
      </code>
    </p>
  </div>
);

};
