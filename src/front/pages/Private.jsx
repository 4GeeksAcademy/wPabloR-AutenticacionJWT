import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Private = () => {

  const { store } = useGlobalReducer()
  const navigate = useNavigate()

  useEffect(()=>{ 
    const token = store.token || sessionStorage.getItem("token")

    if (!token){
      navigate("/login");
    }
  }, [store.token, navigate])

return (
    <div className="container text-center mt-5">
      <h1>Bienvenido a la zona privada 🚀</h1>
      <p>Tu token es: <code>{store.token || sessionStorage.getItem("token")}</code></p>
    </div>
  );

};
