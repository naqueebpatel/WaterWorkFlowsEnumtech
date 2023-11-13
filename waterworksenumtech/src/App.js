import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Carousal from "./components/carousel/Carousal";
import Insert from "./pages/Insert";
import Delete from "./pages/Delete";
import Update from "./pages/Update";
import NavigationBar from "./components/NavigationBar";
import Zone from './components/Zone/Zone';
import Footer from "./components/Footer";
const App = () => {



  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <div>
              <Navbar />
              <Carousal />
            </div>
          } />
          <Route path="/dashboard" element={
            <div>
              <NavigationBar />
              <Dashboard />
              <Footer />
            </div>
          } />
          <Route path="/zone" element={
            <div>
              <NavigationBar />
              <Zone />
              <Footer />
            </div>
          } />
          <Route path="/insert" element={<Insert />} />
          <Route path="/delete" element={<Delete />} />
          <Route path='/update' element={<Update />} />
        </Routes>
      </Router>
    </>
  );
};

export default App; 