import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Carousal from "./components/carousel/Carousal";
import Insert from "./pages/Insert";
import Delete from "./pages/Delete";
import Update from "./pages/Update";
import Form from "./pages/Insert"; 
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Carousal />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/insert" element={<Insert />} />
          <Route path="/delete" element={<Delete />} />
          <Route path='/update' element={<Update />} />
        </Routes>
      </Router>
      <div style={{backgroundColor:"#E6F7FF"}}>
      <h1 style={{textAlign:"center",color:"blue"}}>Subscriber Form</h1>
     <div>
        <Form />
     </div>
     </div>
    </>
  );
};

export default App; 