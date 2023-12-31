import React, { useContext, useEffect, useState } from "react";
import Table from "./Table";
import "./table.css";
import { enqueueSnackbar } from "notistack";
import ResponsiveAppBar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/ContextComp";

const TableWrapper = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const tokenContext = useContext(UserContext)
  console.log({tokenContext})
  const fetchData = async (limit = 10, offset = 0, fetchParams) => {
    let URL = `${process.env.REACT_APP_BASE_URL}/listItems?limit=${limit}&offset=${offset}`;
   
    if (fetchParams) {
      URL += fetchParams;
     }
    setLoading(true);
    const jwtToken = window.sessionStorage.getItem("token");
    const result = await fetch(URL, {
      method: "GET",
      headers: {
        
        // "Access-Control-Allow-Headers":"Cookie",
        credentials:'include',
        
        
        withCredentials:true,
       // Authorization: `Bearer ${jwtToken}`,
      },
      credentials:"include"
    });
    if (result.status === 200 || result.status === 201) {
      const tableData = await result.json();
      setLoading(false);
      setData(tableData);
      setError(null);
    } else {
      setError(true);
      enqueueSnackbar("You are not having valid permissions");
      enqueueSnackbar("Redirecting back to login page");
      setLoading(false);
      setTimeout(() => {
       // navigate("../login", { replace: true });
      }, 3000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="Root">
        <Table
          rows={data}
          fetchData={fetchData}
          error={error}
          loading={loading}
        />
      </div>
    </>
  );
};

export default TableWrapper;
