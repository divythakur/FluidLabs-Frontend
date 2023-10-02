import * as React from "react";

import './payment.css'
import NavBar from "../../components/Navbar";

export default function PaymentSuccess() {
  return (
    <>
    <NavBar path="/success"/>
    <div class="card" style={{marginTop:"30px"}}>
      <div
        style={{
          borderRadius: "200px",
          height: "200px",
          width: "200px",
          background: "#F8FAF5",
          margin: "0 auto",
        }}
      >
        <i class="checkmark">✓</i>
      </div>
      <h1 className=".h1">Success</h1>
      <p>
        We received your purchase request;
        <br /> we'll be in touch shortly!
      </p>
    </div>
    </>
  );
}
