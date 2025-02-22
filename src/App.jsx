import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/LoginForm";
import Profile from "./pages/Dashboard/Profile";
import TransactionList from "./pages/Dashboard/TransactionList";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./components/Register";
import PrivateRoutes from "./routes/protectedRoutes";
import { Toaster } from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Dashboard />
              <Footer />
              <Link
                to="https://wa.me/yourphonenumber"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-18 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
              >
                <FaWhatsapp className="w-8 h-8" />
              </Link>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header />
              <Profile />
              <Footer />
              <Link
                to="https://wa.me/yourphonenumber"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-18 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
              >
                <FaWhatsapp className="w-8 h-8" />
              </Link>
            </>
          }
        />
        <Route
          path="/transactions"
          element={
            <>
              <Header />
              <TransactionList />
              <Footer />
              <Link
                to="https://wa.me/yourphonenumber"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-18 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
              >
                <FaWhatsapp className="w-8 h-8" />
              </Link>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
