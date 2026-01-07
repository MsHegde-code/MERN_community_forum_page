import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { SearchProvider } from "./context/SearchContext";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <NavBar />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;

