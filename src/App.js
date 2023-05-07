// Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// JSX Elements
import { Home, Auth } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
