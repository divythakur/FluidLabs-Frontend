import { Button } from "@mui/material";
import React from "react";

// const PaymentView = () => {

//     const fetchData = async (limit = 10, offset = 0) => {
//         setLoading(true);
//         const jwtToken = window.sessionStorage.getItem("token")
//         const result = await fetch(
//           `http://localhost:8000/listItems?limit=${limit}&offset=${offset}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization:`Bearer ${jwtToken}`
    
//             },
//           }
//         );
//         if (result.status === 200 || result.status ===201) {
//           const tableData = await result.json();
//            setLoading(false);
//           setData(tableData);
//           setError(null);
//         } else {
//           setError(true);
//           enqueueSnackbar("You are not having valid permissions");
//           setLoading(false);
//         }
//       };
//   return (
//     <>
//     <h1>HELLO</h1>
//     <form action="payment" method="POST">

//       <Button
//         src="//checkout.stripe.com/v2/checkout.js"
//         className="stripe-button"
//         data-key="<%= key %>"
//         data-amount="2500"
//         data-currency="inr"
//         data-name="Crafty Gourav"
//         data-description="Handmade Art and Craft Products"
//         data-locale="auto"
//       >BUTTON</Button>
//     </form>
//     </>
//   );
// };

 