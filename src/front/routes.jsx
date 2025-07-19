import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Signup } from "./pages/Signup";
import { Private } from "./pages/Private";
import { Login } from "./pages/Login";
import { ProtectedRoute  } from "./pages/ProtectedRoute";
import { WelcomePage } from "./pages/WelcomePage";

export const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
         <Route index element={<WelcomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={
          <ProtectedRoute>
            <Private /> 
          </ProtectedRoute>
        }
        />
        </Route>
    )
);