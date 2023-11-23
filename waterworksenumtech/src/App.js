import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Carousal from "./components/carousel/Carousal";
import Insert from "./pages/Insert";
import Delete from "./pages/Delete";
import Update from "./pages/Update";
import Zone from './components/Zone/Zone';
import SubscriberAdd from "./components/Subscriber/SubscriberAdd.jsx";
import SubscriberView from "./components/Subscriber/SubscriberView.jsx";
import ThirdPartyDetails from "./components/3rdPartyDetails/ThirdPartyDetails.jsx";
import EmployeeAdd from "./components/Employee/EmployeeAdd.jsx"
import EmployeeView from "./components/Employee/EmployeeView.jsx";
import Inward from "./components/Utility/Inward/Inward.jsx";
import Outward from "./components/Utility/OutWard/Outward.jsx";
import Product from "./components/Utility/product/Product.jsx";
import SideBar from "./components/SideBar.jsx";
import { useState } from "react";
import InwardTransaction from "./components/Transaction/InwardTransaction.jsx";

const App = () => {
  const [collapsed,setCollapsed] = useState(true);
  const toggle = ()=>{
    setCollapsed(!collapsed);
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <div>
              <SideBar collapsed={collapsed} toggle={toggle}/>
              <Navbar />
              <Carousal />
            </div>
          } />
          <Route path="/dashboard" element={
            <div >
              <SideBar/>
              <Dashboard setCollapsed={setCollapsed}/>
            </div>
          } />
          <Route path="/zone" element={
            <div>
              <SideBar/>
              <Zone setCollapsed={setCollapsed}/>
            </div>
          } />

          <Route path="/3rdpartydetails"
            element={
              <div>
                <SideBar/>
                <ThirdPartyDetails setCollapsed={setCollapsed} />
              </div>
            }
          />

            <Route path="/inwardSource"
            element={
              <div>
                <SideBar/>
                <Inward setCollapsed={setCollapsed}/>
              </div>
            }
            />

            <Route
            path="/outwardSource"
            element={
              <div>
                <SideBar/>
                <Outward setCollapsed={setCollapsed} />
              </div>
            }
            />

            <Route
            path="/productSource"
            element={
              <div>
                <SideBar/>
                <Product setCollapsed={setCollapsed}/>
              </div>
            }
            />


          <Route path="/subscriberadd" element={
            <div>
              <SideBar/>
              <SubscriberAdd  setCollapsed={setCollapsed}/>
            </div>
          } />
          <Route path="/subscriberView" element={
            <div>
              <SideBar/>
              <SubscriberView  setCollapsed={setCollapsed}/>
            </div>
          } />
          <Route path="/employeeAdd" element={
            <div>
              <SideBar/>
              <EmployeeAdd  setCollapsed={setCollapsed}/>
            </div>
          } />
          <Route path="/employeeView" element={
            <div>
              <SideBar/>
              <EmployeeView  setCollapsed={setCollapsed}/>
            </div>
          } />
          <Route path="/inwardTrans" element={
            <div>
              <SideBar/>
              <InwardTransaction setCollapsed={setCollapsed}/>
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