import Home from "./pages/Home.jsx";
import ProductsPage from "./pages/Products.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/products" Component={ProductsPage} />
      </Routes>
    </>
  );
}

export default App;
