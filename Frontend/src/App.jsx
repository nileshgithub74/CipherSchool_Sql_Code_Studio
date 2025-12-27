import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import Assignment from "./pages/Assignment.jsx";
import Home from "./pages/Home.jsx";
import AssignmentList from "./pages/AssignmentList.jsx";
import './styles/App.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assignments" element={<AssignmentList />} />
        <Route path="/assignment/:id" element={<Assignment />} />
      </Routes>
    </div>
  );
};

export default App;
