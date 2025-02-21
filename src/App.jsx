import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/LoginForm";
import Profile from "./pages/Dashboard/Profile";
import TransactionList from "./pages/Dashboard/TransactionList";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./components/Register";
import PrivateRoutes from "./routes/protectedRoutes";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transactions" element={<TransactionList />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
