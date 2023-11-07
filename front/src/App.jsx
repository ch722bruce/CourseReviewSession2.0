// import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  // const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/registration" element={<RegistrationPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}
