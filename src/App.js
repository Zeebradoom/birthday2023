import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
// import Welcome from "./welcome";
// import Unauthorized from "./unauthorized";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/welcome" element={<Welcome />} />
        <Route path="/unauthorized" element={<Unauthorized />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
