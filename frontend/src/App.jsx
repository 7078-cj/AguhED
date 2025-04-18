import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";

import Presentation from "./Pages/Present";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";
import PrivateRoutes from "./Context/PrivateRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<PrivateRoutes><Home /></PrivateRoutes>} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/present/:folderID" element={<PrivateRoutes><Presentation /></PrivateRoutes>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;