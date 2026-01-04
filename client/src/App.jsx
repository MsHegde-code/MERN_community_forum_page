import { Fragment } from "react/jsx-runtime";
import NavBar from "./components/NavBar";
import { SearchProvider } from "./context/SearchContext";
import './App.css'

function App(params) {
  return (
    <SearchProvider>
      <NavBar/>
    </SearchProvider>
  )
}

export default App;

