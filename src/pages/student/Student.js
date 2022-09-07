import React, { useEffect, useState } from "react";
import useAuth from "../../auth/useAuth";
import Card from "../../components/Card/Card";
import NavUser from "../../components/navUsers/NavUser";
import Row from "react-bootstrap/Row";

function Student() {
  const { info } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://backedusmart-educasmart.up.railway.app/clases/clasesData")
      .then((res) => res.json())
      .then((clases) => {
        setData(clases);
      });
  },[]);
  let print = [];
  if (data !== 0) {
    for (let i = 0; i < data.length; i++) {
      console.log("entroasdf")
       print.push(<Card clase={data[i]}></Card>);
    }
  }else{
    print.push(<Card clase={data}></Card>);
  }


  return (
    <div className="dashboard d-flex">
      <div>
        <NavUser name={info.Role} />
      </div>
      <div><Row xs={1} md={3} className="g-2 m-2">{print}</Row></div>
      
    </div>
  );
}

export default Student;
