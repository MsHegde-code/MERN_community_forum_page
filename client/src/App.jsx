import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import { SearchProvider } from "./context/SearchContext";
import "./App.css";

function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
