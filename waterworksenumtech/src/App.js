import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Carousal from "./components/carousel/Carousal";
import Insert from "./pages/Insert";
import Delete from "./pages/Delete";
import Update from "./pages/Update";
import NavigationBar from "./components/NavigationBar";
import Zone from './components/Zone/Zone';
import SubscriberAdd from "./components/Subscriber/SubscriberAdd.jsx";
import SubscriberView from "./components/Subscriber/SubscriberView.jsx";
import ThirdPartyDetails from "./components/3rdPartyDetails/ThirdPartyDetails.jsx";
import EmployeeAdd from "./components/Employee/EmployeeAdd.jsx"
import EmployeeView from "./components/Employee/EmployeeView.jsx";
import Inward from "./components/Utility/Inward/Inward.jsx";
import Outward from "./components/Utility/OutWard/Outward.jsx";
import Product from "./components/Utility/product/Product.jsx";

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
            </div>
          } />
          <Route path="/zone" element={
            <div>
              <NavigationBar />
              <Zone />
            </div>
          } />

          <Route path="/3rdpartydetails"
            element={
              <div>
                <NavigationBar />
                <ThirdPartyDetails />
              </div>
            }
          />

            <Route path="/inward"
            element={
              <div>
                <NavigationBar/>
                <Inward/>
              </div>
            }
            />

            <Route
            path="/outward"
            element={
              <div>
                <NavigationBar/>
                <Outward/>
              </div>
            }
            />

            <Route
            path="/product"
            element={
              <div>
                <NavigationBar/>
                <Product/>
              </div>
            }
            />


          <Route path="/subscriberadd" element={
            <div>
              <NavigationBar />
              <SubscriberAdd/>
            </div>
          } />
          <Route path="/subscriberView" element={
            <div>
              <NavigationBar />
              <SubscriberView />
            </div>
          } />
          <Route path="/employeeAdd" element={
            <div>
              <NavigationBar />
              <EmployeeAdd/>
            </div>
          } />
          <Route path="/employeeView" element={
            <div>
              <NavigationBar />
              <EmployeeView/>
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