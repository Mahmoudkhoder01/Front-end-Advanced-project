import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function Read() {
const [APIData, setAPIData] = useState([]);
useEffect(() => {
  axios
    .get(`http://localhost:8000/api/grade`)
    .then((response) => {
      setAPIData(response.data.message);
      console.log(response.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);
}

