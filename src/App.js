// Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// JSX Elements
import { Home } from "./pages";
import { Header } from "./containers";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
