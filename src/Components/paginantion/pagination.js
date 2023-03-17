// import * as React from "react";
// import { useState, useEffect } from "react";
// import Pagination from "@mui/material/Pagination";
// import PaginationItem from "@mui/material/PaginationItem";
// import Stack from "@mui/material/Stack";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import classes from "./pagination.module.css";
// import axios from "axios";

// export default function Paginate() {
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/students/pagination");
//       setData(response.data.message);
//       console.log(response.data.message);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   useEffect(() => fetchData(), []);

//   return (
//     <div className={classes.pagination}>
//       <Stack spacing={2}>
//         <Pagination
//           count={data.last_page}
//           renderItem={(item) => (
//             <PaginationItem
//               slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
//               {...item}
//             />
//           )}
//         />
//       </Stack>
//     </div>
//   );
// }

import * as React from "react";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import classes from "./pagination.module.css";
import axios from "axios";
import Loading from "../Loading/loading";

export default function Paginate(props) {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataByPagination = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/auth/user/pagination?page=${page}`
      );
      setData(response.data);
      setIsLoading(true);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchDataByPagination();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(parseInt(event.target.textContent));
  };
  console.log(page);
  return (
    <div className={classes.pagination}>
      {isLoading ? (
        <Stack spacing={2}>
          <Pagination
            count={data.message.last_page}
            page={page}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      ) : (
        <Loading />
      )}
    </div>
  );
}
