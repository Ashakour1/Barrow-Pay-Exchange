import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/LoginForm";
import Profile from "./pages/Dashboard/Profile";
import TransactionList from "./pages/Dashboard/TransactionList";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <div>
              <Register />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <Login />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div>
              <Header />
              <Profile />
              <Footer />
            </div>
          }
        />{" "}
        <Route
          path="/transactions"
          element={
            <div>
              <TransactionList />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Dashboard />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
