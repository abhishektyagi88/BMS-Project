import Home from "./Pages/Home/Index";
import Login from "./Pages/Login/Index";
import Register from "./Pages/Register/Index";
import ProtectedRoute from "./Components/ProtectedRoute";

import "./styleSheets/custom.css";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from "./Pages/Admin";
import Profile from "./Pages/Profile";
import TheatresForMovies from "./Pages/TheatresForMovies";
import BookShow from "./Pages/BookShow/BookShow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          // <ProtectedRoute>
            <Home />
          // </ProtectedRoute>
        }
        />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
        />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
        />
        <Route path="/book-show/:id" element={<BookShow/>}/>
        <Route path="/movie/:id"
          element={
            // <ProtectedRoute>
              <TheatresForMovies />
            // </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
