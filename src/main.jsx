
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditProfile from "./pages/EditProfile";
import HomePage from "./pages/HomePage";
import Loginpage from "./pages/Loginpage";
import ProfilePage from "./pages/ProfilePage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<Router>
<Routes>
<Route path="/EditProfile" element={<EditProfile />} />
       <Route path="/Home" element={<HomePage />} />
        <Route path="/Login" element={<Loginpage />} />
         <Route path="/Profile" element={<ProfilePage />} />
</Routes>
      <App/>
</Router>
  </React.StrictMode>,
)