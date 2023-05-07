// Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// JSX Elements
import { Home } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
