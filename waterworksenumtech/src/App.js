import Navbar from "./components/Navbar";
import ContactUs from "./pages/ContactUs";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import AboutUs from "./pages/AboutUs";
// import ContactUs from "./pages/ContactUs";
const App = () => {
  return (
    <>
      <Navbar />
      <Home/>
      <ContactUs/>
    </>
  );
};

export default App;