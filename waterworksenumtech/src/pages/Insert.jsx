import React from "react"

export default function Form(){
    return(
        <><div>
           <div>
           <h1 style={{marginLeft:"240px"}}>Personal Details</h1>
               <input type="text" placeholder="Subscriber Adhar No" name="Subscriber_Adhar_no" style={{padding:"15px",marginLeft:"250px",marginRight:"100px",float:"left",borderRadius:"8px"}} />
           </div>
           <div>
           <input type="text" placeholder="Subscriber Name" name="Subscriber_name" style={{padding:"15px",float:"left",marginRight:"100px",borderRadius:"8px"}} />
       </div>
       <div>
           <input type="text" placeholder="Subscriber Surname" name="Subscriber_surname" style={{padding:"15px",float:"left",marginRight:"300px",marginLeft:"900px",marginTop:"-50px",borderRadius:"8px"}} />
       </div>
       </div>
       <div style={{marginTop:"-30px"}}>
       <div style={{ display: "flex", alignItems: "center"}}>
  <div style={{ position: "relative",right:"100px",marginTop:"150px",marginLeft:"-1012px",marginRight:"10px",marginBottom:"50px"}}>
    <label for="dropdown">
    </label>
    <select id="dropdown" style={{ width: "100%",padding:"10px",borderRadius:"8px"}}>
     <option value="index">SELECT ZONE</option>
      <option value="option1">0</option>
      <option value="option2">1</option>
      <option value="option3">2</option>
      <option value="option4">3</option>
      <option value="option5">4</option>
      <option value="option6">5</option>
    </select>
  </div>
</div>
<div style={{marginTop:"-100px"}}>
    <input type="text" placeholder="Subscriber Mobile No" name="Subscriber_mobile" style={{padding:"15px",marginLeft:"555px",borderRadius:"8px"}} />
</div>
</div>
<h2 style={{marginLeft:"240px"}}>Address Details</h2>
<div style={{marginLeft:"240px"}}>
<input type="text" placeholder="Enter Area" name="Subscriber_address" style={{padding:"15px",borderRadius:"8px"}}/>
</div>
<div style={{marginLeft:"555px",marginTop:"-50px",borderRadius:"8px"}}>
<input type="text" placeholder="Enter City" name="Subscriber_address" style={{padding:"15px",borderRadius:"8px"}}/>
</div>
<div style={{marginLeft:"240px",marginTop:"50px"}}>
<input type="text" placeholder="Enter State" name="Subscriber_address" style={{padding:"15px",borderRadius:"8px"}}/>
</div>
<div style={{marginLeft:"555px",marginTop:"-50px"}}>
<input type="text" placeholder="Post Code" name="Subscriber_address" style={{padding:"15px",borderRadius:"8px"}}/>
</div>
<div style={{marginLeft:"240px"}}>
    <h3>Subscriber Financial Status</h3>
<label><input type="radio" name="Subscriber_financial_status"/>0</label>
<label><input type="radio" name="Subscriber_financial_status" />1</label>
<label><input type="radio" name="Subscriber_financial_status" />2</label>
</div>
<div style={{marginLeft:"240px"}}>
    <h4>Subscriber Connection Status</h4>
<label><input type="radio" name="Subscriber_connection_status(for programmer)"/>Active</label>
<label><input type="radio" name="Subscriber_connection_status(for programmer)"/>Paused</label>
<label><input type="radio" name="Subscriber_connection_status(for programmer)"/>Suspended</label>
</div>
<div>
    <button type="button" style={{padding:"10px 15px",marginLeft:"600px",marginTop:"20px",backgroundColor:"#4CAF50",color:"white",borderRadius:"8px"}}>Submit</button>
</div>
</>
    )
}