import React from "react";
import "../styles/dashboard.css"

export default function Dashboard(){
    return(
        <>
        <div className="zones">
            <b><p style={{fontSize:"30px",marginTop:"60px",paddingLeft:"30px"}}>Total</p></b>
            <b><p style={{fontSize:"30px",marginTop:"-25px",paddingLeft:"30px"}}>Zones</p></b>
            <b><p style={{fontSize:"80px",marginLeft:"230px",marginTop:"-140px"}}>0</p></b>
        </div>
        <div className="subscribers">
            <b><p style={{fontSize:"30px",marginTop:"60px",paddingLeft:"30px"}}>Total</p></b>
            <b><p style={{fontSize:"30px",marginTop:"-25px",paddingLeft:"30px"}}>Subscribers</p></b>
            <b><p style={{fontSize:"80px",marginLeft:"230px",marginTop:"-140px"}}>0</p></b>
        </div>
        <div className="employees">
            <b><p style={{fontSize:"30px",marginTop:"60px",paddingLeft:"30px"}}>Total</p></b>
            <b><p style={{fontSize:"30px",marginTop:"-25px",paddingLeft:"30px"}}>Employees</p></b>
            <b><p style={{fontSize:"80px",marginLeft:"230px",marginTop:"-140px"}}>0</p></b>
        </div>
        <div className="a">
            <p style={{marginTop:"60px",paddingLeft:"30px"}}>Hi</p>
        </div>
        <div className="b">
        <p style={{marginTop:"60px",paddingLeft:"30px"}}>Hello</p>
        </div>
        </>
    )
}