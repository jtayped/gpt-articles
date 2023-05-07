// Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// JSX Elements
import { Home, Auth, LogIn, SignUp } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="" element={<Home />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/auth/login" element={<LogIn />} />
        <Route exact path="/auth/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
